# from django.urls import path
# from .views import (
#     TutorAssignmentCreateView,
#     # TutorAssignmentListView,   # 👈 ADD
#     StudentAssignmentListView,
#     AssignmentSubmitView,
#     TutorReviewSubmissionView,
#     TutorCreatedAssignmentListView,
#     TutorSubmissionListView,    


# )

# urlpatterns = [
#     # Tutor
#     path("assignments/tutor/create/", TutorAssignmentCreateView.as_view()),
#     # path("assignments/tutor/list/", TutorAssignmentListView.as_view()),  # 👈 ADD
#     path("assignments/tutor/review/<int:pk>/", TutorReviewSubmissionView.as_view()),
#     path("assignments/tutor/created/", TutorCreatedAssignmentListView.as_view()),  # ✅ NEW
#     path("assignments/tutor/submissions/", TutorSubmissionListView.as_view()),  # ✅ FIX



#     # Student
#     path("assignments/student/list/", StudentAssignmentListView.as_view()),
#     path("assignments/student/submit/", AssignmentSubmitView.as_view()),
# ]



from django.urls import path
from .views import (
    TutorAssignmentCreateView,
    TutorCreatedAssignmentListView,
    TutorSubmissionListView,
    TutorReviewSubmissionView,
    StudentAssignmentListView,
    AssignmentSubmitView,
    StudentSubmissionListView,
    AssignmentSubmissionDownloadView
)

urlpatterns = [
    # TUTOR
    path("assignments/tutor/create/", TutorAssignmentCreateView.as_view()),
    path("assignments/tutor/created/", TutorCreatedAssignmentListView.as_view()),
    path("assignments/tutor/submissions/", TutorSubmissionListView.as_view()),
    path("assignments/tutor/review/<int:pk>/", TutorReviewSubmissionView.as_view()),

    # STUDENT
    path("assignments/student/list/", StudentAssignmentListView.as_view()),
    path("assignments/student/submit/", AssignmentSubmitView.as_view()),
    path("assignments/student/submissions/", StudentSubmissionListView.as_view()),

    # FILE
    path(
        "assignments/submission/download/<int:pk>/",
        AssignmentSubmissionDownloadView.as_view()
    ),
]
