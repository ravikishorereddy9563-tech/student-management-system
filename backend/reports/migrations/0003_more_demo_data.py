from datetime import date, timedelta

from django.db import migrations


def seed_more_demo_data(apps, schema_editor):
    Student = apps.get_model("students", "Student")
    Teacher = apps.get_model("teachers", "Teacher")
    Department = apps.get_model("academics", "Department")
    Course = apps.get_model("academics", "Course")
    Subject = apps.get_model("academics", "Subject")
    ClassRoom = apps.get_model("academics", "ClassRoom")
    Attendance = apps.get_model("attendance", "Attendance")
    Exam = apps.get_model("examinations", "Exam")
    Mark = apps.get_model("examinations", "Mark")
    Fee = apps.get_model("fees", "Fee")
    Announcement = apps.get_model("notifications", "Announcement")
    Notification = apps.get_model("notifications", "Notification")

    student_data = [
        ("1001", "Anjali", "Sharma", "anjali.sharma@example.com", "FEMALE", "bca", "cse", 2, 1),
        ("1002", "Arjun", "Reddy", "arjun.reddy@example.com", "MALE", "btech", "cse", 3, 2),
        ("1003", "Priya", "Singh", "priya.singh@example.com", "FEMALE", "bsc", "ece", 1, 1),
        ("1004", "Kiran", "Kumar", "kiran.kumar@example.com", "MALE", "mca", "mech", 2, 1),
        ("1005", "Meena", "Patel", "meena.patel@example.com", "FEMALE", "btech", "eee", 4, 2),
    ]
    students = []
    for admission_number, first_name, last_name, email, gender, course, department, year, semester in student_data:
        student, _ = Student.objects.get_or_create(
            admission_number=admission_number,
            defaults={
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone": "90000000" + admission_number[-2:],
                "gender": gender,
                "date_of_birth": date(2002, 5, 15),
                "course": course,
                "department": department,
                "year": year,
                "semester": semester,
                "address": "College campus",
            },
        )
        students.append(student)

    teacher_data = [
        ("TCH003", "Ravi", "Kumar", "ravi.kumar@example.com", "M.Tech Mathematics"),
        ("TCH004", "Lakshmi", "Rao", "lakshmi.rao@example.com", "M.Sc Physics"),
        ("TCH005", "Vikram", "Das", "vikram.das@example.com", "M.Tech Mechanical"),
    ]
    for employee_id, first_name, last_name, email, qualification in teacher_data:
        Teacher.objects.get_or_create(
            employee_id=employee_id,
            defaults={
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone": "91000000" + employee_id[-1],
                "qualification": qualification,
                "specialization": "Academic Studies",
                "joining_date": date(2024, 6, 1),
            },
        )

    departments = {department.code: department for department in Department.objects.all()}
    for code, department in departments.items():
        course = Course.objects.filter(department=department).first()
        if course:
            Subject.objects.get_or_create(
                code=f"{code}-102",
                defaults={"course": course, "name": f"Advanced {department.name}", "semester": 2, "credits": 3},
            )

    for code, name, room, start_time in [
        ("CSE-B", "Computer Science - B", "Room 103", "09:00"),
        ("ECE-B", "Electronics - B", "Room 104", "10:00"),
        ("BCA-A", "Computer Applications - A", "Room 202", "11:00"),
    ]:
        ClassRoom.objects.get_or_create(code=code, defaults={"name": name, "year": 2, "room": room, "start_time": start_time})

    subject = Subject.objects.first()
    if subject:
        for index, student in enumerate(students):
            Attendance.objects.get_or_create(student=student, subject=subject, date=date(2026, 8, 20), defaults={"status": "absent" if index % 3 == 0 else "present"})
            Mark.objects.get_or_create(student=student, subject=subject, defaults={"marks": 72 + index * 4, "grade": "B+" if index < 2 else "A"})

        Exam.objects.get_or_create(name="Second Internal Exam", subject=subject.name, defaults={"exam_date": date(2026, 9, 25), "room_number": "Room 105"})

    for student in students:
        Fee.objects.get_or_create(
            student_id=student.admission_number,
            fee_type="exam",
            defaults={
                "student_name": f"{student.first_name} {student.last_name}",
                "amount": 5000,
                "paid_amount": 5000,
                "due_date": date(2026, 9, 1),
                "payment_date": date(2026, 8, 15),
                "payment_status": "paid",
                "transaction_id": f"TXN-{student.admission_number}",
                "payment_method": "Online",
            },
        )

    for title, content, announcement_type in [
        ("Welcome Back", "The new academic semester has started.", "Academic"),
        ("Library Hours Updated", "The library is open until 8 PM on weekdays.", "General"),
    ]:
        Announcement.objects.get_or_create(title=title, defaults={"content": content, "announcement_type": announcement_type})

    for message in ["Five demo student records are available.", "Fee records have been updated."]:
        Notification.objects.get_or_create(message=message)


class Migration(migrations.Migration):
    dependencies = [
        ("reports", "0002_default_settings"),
        ("students", "0001_initial"),
        ("teachers", "0003_default_teachers"),
        ("academics", "0005_default_classes"),
        ("attendance", "0002_default_attendance"),
        ("examinations", "0003_default_exams_marks"),
        ("fees", "0002_default_fees"),
        ("notifications", "0002_default_notifications"),
    ]

    operations = [migrations.RunPython(seed_more_demo_data, migrations.RunPython.noop)]