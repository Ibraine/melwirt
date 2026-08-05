

# Create your views here.
import razorpay
import json

from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Payment
from courses.models import Course
from enrollments.models import Enrollment

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


# ---------------------------
# CREATE ORDER
# ---------------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    try:

        # course_id = request.data.get("course_id")
        
        course_id = request.data.get("course_id") or request.data.get("course")


        course = Course.objects.get(id=course_id)
        # check if already purchased
        if Enrollment.objects.filter(student=request.user, course=course).exists():
             return Response(
                  {"error": "You already purchased this course"},
                  status=400
             )
        amount = int(course.price_inr * 100)

        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })

        Payment.objects.create(
            student=request.user,
            course=course,
            amount=amount,
            razorpay_order_id=order["id"]
        )

        return Response({

            "order_id": order["id"],
            "amount": amount,
            "key": settings.RAZORPAY_KEY_ID

        })

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


# ---------------------------
# VERIFY PAYMENT
# ---------------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_payment(request):

    try:

        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_signature = request.data.get("razorpay_signature")

        client.utility.verify_payment_signature({

            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature

        })

        payment = Payment.objects.get(
            razorpay_order_id=razorpay_order_id
        )

        if payment.status == "paid":

            return Response({
                "message": "Already paid"
            })

        payment.razorpay_payment_id = razorpay_payment_id
        payment.razorpay_signature = razorpay_signature
        payment.status = "paid"

        payment.save()

        # # enroll student
        # course = payment.course
        # course.enrolled_students.add(payment.student)
        # enroll student
        course = payment.course
        student = payment.student

        course.enrolled_students.add(student)

        Enrollment.objects.get_or_create(
        student=student,
        course=course,
        defaults={
             "status": "active",
             "payment_done": True
    }
)



        return Response({

            "message": "Payment successful"

        })

    except razorpay.errors.SignatureVerificationError:

        return Response({
            "error": "Invalid signature"
        }, status=400)

    except Exception as e:

        return Response({
            "error": str(e)
        }, status=400)


# ---------------------------
# WEBHOOK (production required)
# ---------------------------

@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def razorpay_webhook(request):

    webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET

    body = request.body.decode("utf-8")

    signature = request.headers.get("X-Razorpay-Signature")

    try:

        client.utility.verify_webhook_signature(
            body,
            signature,
            webhook_secret
        )

        data = json.loads(body)

        if data["event"] == "payment.captured":

            order_id = data["payload"]["payment"]["entity"]["order_id"]
            payment_id = data["payload"]["payment"]["entity"]["id"]

            payment = Payment.objects.get(
                razorpay_order_id=order_id
            )

            if payment.status != "paid":

                payment.status = "paid"
                payment.razorpay_payment_id = payment_id

                payment.save()

                payment.course.enrolled_students.add(
                    payment.student
                )
                Enrollment.objects.get_or_create(
                    student=payment.student,
                    course=payment.course,
                    defaults={
                       "status": "active",
                       "payment_done": True
                    }
               )
        return Response({"status": "ok"})
        
    except Exception as e:

        return Response(
            {"error": str(e)},
            status=400
        )
