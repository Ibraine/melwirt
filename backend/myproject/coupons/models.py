from django.db import models

class Coupon(models.Model):
    CODE_TYPE = [
        ("Percentage", "Percentage"),
        ("Flat", "Flat"),
    ]
    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=20, choices=CODE_TYPE)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    min_cart_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    first_time_user = models.BooleanField(default=False)
    usage_limit = models.IntegerField(null=True, blank=True)
    usage_count = models.IntegerField(default=0)
    status = models.BooleanField(default=True)  # True = Active, False = Inactive
    valid_from = models.DateField(null=True, blank=True)
    valid_to = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.code
