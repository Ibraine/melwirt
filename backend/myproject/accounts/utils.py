import hashlib

def hash_otp(otp):
    return hashlib.sha256(otp.encode()).hexdigest()
