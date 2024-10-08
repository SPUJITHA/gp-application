show databases;
create database onlinegp;
use onlinegp;

select * from users;
------Users Table--------------
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  role ENUM('Patient', 'Doctor', 'Nurse', 'Admin') NOT NULL,
  email_id VARCHAR(100)
);

------Doctors  Table--------------
CREATE TABLE doctors (
  doctor_id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_name VARCHAR(100) NOT NULL,
  specialty VARCHAR(100),
  qualifications TEXT,
  rating DECIMAL(3,2),
  email_id VARCHAR(100) UNIQUE,
  phone_number VARCHAR(15),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);



--------Doctor Unavailability Table---------------------
CREATE TABLE doctor_unavailability (
  unavailability_id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  unavailable_start_day DATE, 
  unavailable_end_day DATE,
  unavailable_reason VARCHAR(100),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

------User Profile Table--------------
CREATE TABLE user_profile (
    user_profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    contact_number VARCHAR(50),
    address TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

------------Technical Requests-----------------
CREATE TABLE technical_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    issue_description VARCHAR(50),
    issue_type VARCHAR(250),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Users(user_id)
);


-- Appointments Table-------------------
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    status ENUM('Booked', 'Cancelled', 'Completed'),
    FOREIGN KEY (patient_id) REFERENCES Users(user_id),
    FOREIGN KEY (patient_id) REFERENCES Users(user_id)
);
-- Modify the Appointments Table to use a different column name for the foreign key
ALTER TABLE appointments ADD COLUMN patient_details_id INT;

-- Adding a Foreign Key Constraint-------------
ALTER TABLE appointments
ADD CONSTRAINT fk_patient_details_id
FOREIGN KEY (patient_details_id) REFERENCES patient_details(patient_id);
alter table appointments modify column status  ENUM ('Booked', 'Cancelled', 'Completed', 'Rescheduled')
desc appointments;
SELECT * FROM appointments;

--------------Prescription Items--------------
CREATE TABLE prescription_items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  prescription_id INT NOT NULL,
  medicine_name VARCHAR(255) NOT NULL,
  frequency INT NOT NULL,
  duration INT NOT NULL,
  refill BOOLEAN DEFAULT FALSE,
  refill_months INT NOT NULL,
  FOREIGN KEY (prescription_id) REFERENCES prescription(prescription_id)
);

------------Alter Prescriptin_Items-------------
ALTER TABLE prescription_items
MODIFY COLUMN refill_months INT NULL;  -- This allows null values in 'refill_months'

-- drop table prescription_items;
CREATE TABLE prescription (
  prescription_id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT NOT NULL,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  date_issued DATE NOT NULL,
  status ENUM('New', 'Paid', 'Dispatched', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'New',
  payment_status ENUM('Pending', 'Completed', 'Failed') NOT NULL DEFAULT 'Pending',
  transaction_id VARCHAR(255),
  tracking_number VARCHAR(255),
  notes TEXT,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id),
  FOREIGN KEY (patient_id) REFERENCES users(user_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);
ALTER TABLE prescription DROP COLUMN notes;
-- PatientMedicalRecord Table
CREATE TABLE patient_medical_record (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    medical_history_details TEXT,
    current_treatment TEXT,
    test_results TEXT,
    FOREIGN KEY (patient_id) REFERENCES Users(user_id)
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT,
    notification_date DATE,
    status ENUM('Sent', 'Received', 'Read'),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Feedback Table
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT,
    rating INT,
    comments TEXT,
    feedback_date DATE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);

----Patient Profile Table----------
CREATE TABLE patient_details (
  patient_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  phone_number VARCHAR(15),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(10),
  country VARCHAR(100),
  medical_history TEXT,
  allergies TEXT,
  current_medication TEXT,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

alter table patient_details add  column email VARCHAR(100) NOT NULL;
------Symptoms Table-----------
CREATE TABLE symptoms (
    symptom_id INT AUTO_INCREMENT PRIMARY KEY,
    symptom_name VARCHAR(255) NOT NULL,
    speciality VARCHAR(255) NOT NULL
);

--------Doctor Availability---------
CREATE TABLE doctor_availability (
  availability_id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  available_day DATE, 
  available_start_time TIME,
  available_end_time TIME,
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

insert into symptoms (symptom_name, speciality) values ('allergic reactions','allergy and immunology');
insert into symptoms (symptom_name, speciality) values ('skin infections', 'dermatology');
insert into symptoms (symptom_name, speciality) values ('bacterial infections', 'infectious disease');
insert into symptoms (symptom_name, speciality) values ('gynecologic cancers', 'obstetrics and gynecology');
insert into symptoms (symptom_name, speciality) values ('growth and development issues', 'pediatrics');
insert into symptoms (symptom_name, speciality) values ('vaccinations', 'family medicine');
insert into symptoms (symptom_name, speciality) values ('depression and anxiety', 'psychiatry');
insert into symptoms (symptom_name, speciality) values ('vision changes', 'ophthalmology');
insert into symptoms (symptom_name, speciality) values ('urinary incontinence', 'urology');
insert into symptoms (symptom_name, speciality) values ('fever, joint pain, swelling, rheumatoid arthritis, lupus.', 'rheumatology');

CREATE TABLE medicine (
    medicine_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each medicine
    medicine_name VARCHAR(255) NOT NULL,         -- Name of the medicine
    dosage_form VARCHAR(100),                    -- Form of the medicine (e.g., tablet, capsule, liquid)
    unit_price DECIMAL(10, 2),                   -- Cost per unit (e.g., in USD, GBP, etc.)
    manufacturer VARCHAR(255),                   -- Manufacturer's name
    description TEXT                           -- Additional information (optional)
);

-- Add medicine_id as a foreign key in prescription_items
ALTER TABLE prescription_items
ADD COLUMN medicine_id INT,  -- New column to hold the reference to the medicine
ADD CONSTRAINT fk_prescription_items_medicine
  FOREIGN KEY (medicine_id)
  REFERENCES medicine(medicine_id);

-- Insert sample data into the 'medicine' table
INSERT INTO medicine (medicine_name, dosage_form, unit_price, manufacturer, description)
VALUES
  ('Paracetamol', 'Tablet', 0.50, 'PharmaCorp', 'Common painkiller used for headaches and fever'),
  ('Ibuprofen', 'Capsule', 0.75, 'HealthInc', 'Anti-inflammatory used for pain and swelling'),
  ('Amoxicillin', 'Liquid', 1.20, 'Medico', 'Antibiotic for bacterial infections'),
  ('Aspirin', 'Tablet', 0.60, 'HealthInc', 'Pain relief and anti-inflammatory'),
  ('Cetirizine', 'Tablet', 0.40, 'PharmaCorp', 'Antihistamine used for allergy relief'),
  ('Metformin', 'Tablet', 0.90, 'HealthPharma', 'Medication for managing type 2 diabetes'),
  ('Loratadine', 'Syrup', 0.85, 'MedLife', 'Antihistamine used for allergies'),
  ('Doxycycline', 'Capsule', 1.10, 'PharmaCorp', 'Antibiotic for bacterial infections'),
  ('Levothyroxine', 'Tablet', 1.00, 'EndoPharm', 'Used to treat hypothyroidism'),
  ('Omeprazole', 'Capsule', 1.30, 'MedLife', 'Reduces stomach acid production'),
  ('Simvastatin', 'Tablet', 0.70, 'HealthPharma', 'Lowers cholesterol levels'),
  ('Warfarin', 'Tablet', 0.65, 'HealthInc', 'Blood thinner for clot prevention'),
  ('Prednisone', 'Tablet', 1.15, 'PharmaCorp', 'Corticosteroid for inflammation'),
  ('Azithromycin', 'Capsule', 1.50, 'Medico', 'Antibiotic for bacterial infections'),
  ('Furosemide', 'Tablet', 0.55, 'HealthInc', 'Diuretic for fluid retention'),
  ('Insulin Glargine', 'Injection', 2.50, 'DiabetesCare', 'Insulin for diabetes management'),
  ('Ranitidine', 'Tablet', 0.90, 'MedLife', 'Used to treat acid reflux'),
  ('Clopidogrel', 'Tablet', 0.80, 'HeartMed', 'Prevents blood clots'),
  ('Salbutamol', 'Inhaler', 1.40, 'HealthPharma', 'Bronchodilator for asthma'),
  ('Hydrochlorothiazide', 'Tablet', 0.65, 'HealthInc', 'Diuretic for high blood pressure');

------Technical Requests---------
CREATE TABLE technical_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    issue_description VARCHAR(50),
    issue_type VARCHAR(250),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Users(user_id)
);

----------Comments------------------
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    author_id INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES technical_requests(id),
    FOREIGN KEY (author_id) REFERENCES Users(user_id)
);

CREATE TABLE otp_entry (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(255) NOT NULL,
    expiration_time DATETIME NOT NULL
);

------------------------------------------------------------

desc users;
select * from users;
alter table users drop column user_name;
INSERT INTO users (email_id, password, role) values ('smith@doctor.com','smith123','Doctor')
INSERT INTO users (email_id, password, role) values ('jones@doctor.com','jones123','Doctor')
INSERT INTO users (email_id, password, role) values ('allen@doctor.com','allen123','Doctor')
INSERT INTO users (email_id, password, role) values ('baker@doctor.com','baker123','Doctor')
INSERT INTO users (email_id, password, role) values ('admin','admin123','Admin')
select * from users;
update users set email_id ='admin@mydocvisit.com' where user_id ='9'

select * from patient_details;
delete from patient_details where patient_id ='3';

select * from symptoms;
desc doctors;
alter table doctors rename column specialty to speciality;
INSERT INTO doctors
 (doctor_name, speciality, qualifications, rating, email_id, phone_number, user_id) 
VALUES 
('Dr. Smith', 'Cardiology', 'MD, FACC', 4.5, 'dr.smith@email.com', '+44123456','5');

INSERT INTO doctors
 (doctor_name, speciality, qualifications, rating, email_id, phone_number, user_id) 
VALUES 
('Dr. Jones', 'Pediatrics', 'MD, FAAP', 4.7, 'dr.jones@email.com', '+44765476','6');
INSERT INTO doctors
 (doctor_name, speciality, qualifications, rating, email_id, phone_number, user_id) 
 values
('Dr. Allen', 'Neurology', 'MD, PhD', 4.6, 'dr.allen@email.com', '+44998765','7');
INSERT INTO doctors
 (doctor_name, speciality, qualifications, rating, email_id, phone_number, user_id) 
 values
('Dr. Baker', 'Dermatology', 'MD, FAAD', 4.8, 'dr.baker@email.com', '+447767898','8');

insert into doctor_availability (doctor_id , available_day, available_start_time, available_end_time)
values
('1','2024-03-01','9:00:00','12:00:00');
insert into doctor_availability (doctor_id , available_day, available_start_time, available_end_time)
values
('2','2024-03-02','12:00:00','15:00:00');
select * from doctor_availability;
truncate table doctor_availability;
delete from doctor_availability where available_day = 
select * from doctors;
update doctors set email_id = 'smith@doctor.com' where doctor_id = '1'

select * from users;
SELECT doctor_id, doctor_name, speciality, rating FROM doctors;
SELECT DATE_FORMAT(available_start_time, '%h:%i %p') as formatted_time
FROM doctor_availability
WHERE doctor_id = 1;
select * from doctors;
select * from users;


select * from appointments where patient_id ='2';

alter table appointments add column symptoms VARCHAR(1000) NOT NULL;

select * from users;

delete from users where user_id = '1';

select * from feedback;

truncate  feedback;

select * from patient_details;
update patient_details set email='pujitha.s97@gmail.com' where patient_id='1'

select * from doctors;
select * from symptoms;

SELECT  D.email_id
FROM doctors D
JOIN symptoms S  ON D.speciality = S.speciality 
WHERE S.symptom_name like '%fever%';


select * from appointments order by appointment_id desc;

select * from doctor_unavailability;

select * from appointments;

select * from appointments where doctor_id ='1'

select
        a1_0.appointment_id,
        pd1_0.first_name,
        pd1_0.last_name,
        pd1_0.email,
        a1_0.appointment_date,
        a1_0.appointment_time,
        a1_0.status,
        a1_0.symptoms 
    from
        appointments a1_0 
    join
        patient_details pd1_0 
            on pd1_0.patient_id=a1_0.patient_details_id 
    where
        a1_0.doctor_id='4'
    order by
        a1_0.appointment_date desc
        
        select * from doctors;
        select * from users;
        
        update doctors set email_id ='baker@doctor.com' where doctor_id='4';

select
        a1.appointment_id,
        pd1.first_name,
        pd1.last_name,
        pd1.email,
        a1.appointment_date,
        a1.appointment_time,
        a1.status,
        a1.symptoms 
    from
        appointments a1
    join
        patient_details pd1
            on pd1.patient_id=a1.patient_details_id 
            
select a. appointment_id,first_name,
        pd1.last_name,
        pd1.email,
        a1.appointment_date,
        a1.appointment_time,
        a1.status,
        a1.symptoms  from appointments;
            
            desc appointments;
            desc patient_details;

select * from patient_details;
select * from appointments;

update  appointments set patient_details_id = '1' where patient_id='2'

select count(*) from appointments where doctor_id ='4';

select * from prescription;
select * from appointments where doctor_id is null

SELECT
        p.prescription_id,
        p.date_issued,
        p.status,
        p.payment_status,
        i.* 
    FROM
        prescription p 
    INNER JOIN
        prescription_items i 
            ON p.prescription_id = i.prescription_id 
    WHERE
        p.appointment_id = '18'
        
        

delete from  prescription where prescription_id = '3'


delete from  prescription_items where prescription_id = '3'
select * from prescription_items;

select * from prescription where appointment_id ='47'

select * from users;

select * from doctors;

select * from doctor_unavailability;

select * from prescription_items;
desc prescription_items;

desc prescription_items;
desc prescription;

select * from medicine;

update prescription_items set medicine_name ='Paracetamol' where  item_id='1'

UPDATE prescription_items
SET medicine_id = (SELECT medicine_id FROM medicine WHERE medicine_name = prescription_items.medicine_name);

DESCRIBE prescription_items;

ALTER TABLE prescription_items
MODIFY COLUMN medicine_name VARCHAR(255) NULL;

select * from prescription_items;
select * from medicine;

select
        p1_0.prescription_id,
        p1_0.date_issued,
        p1_0.status,
        p1_0.payment_status,
        p1_0.transaction_id,
        p1_0.tracking_number,
        m1_0.medicine_name,
        i1_0.frequency,
        i1_0.duration,
        i1_0.refill,
        i1_0.refill_months,
        ((i1_0.frequency*i1_0.duration)*m1_0.unit_price) 
    from
        prescription p1_0 
    join
        prescription_items i1_0 
            on p1_0.prescription_id=i1_0.prescription_id 
    join
        medicine m1_0 
            on m1_0.medicine_id=i1_0.medicine_id 
    where
        p1_0.appointment_id='20'
        
        select * from prescription where appointment_id='20';

select * from prescription where prescription_id ='22'
update  prescription
 set status ='New' , payment_status ='Pending' , transaction_id =null where prescription_id='22'

select *  from prescription where appointment_id ='18'

select * from prescription where patient_id='2'

select * from appointments where doctor_id ='1'

 select
        a1_0.appointment_id,
        pd1_0.email,
        pd1_0.first_name,
        pd1_0.last_name,
        a1_0.appointment_date,
        a1_0.appointment_time,
        a1_0.status,
        a1_0.symptoms 
    from
        appointments a1_0 
    join
        patient_details pd1_0 
            on pd1_0.patient_id=a1_0.patient_details_id 
    where
        a1_0.doctor_id='1'
    order by
        a1_0.appointment_date desc 
select * from appointments where doctor_id ='1'
select * from patient_details where patient_id ='1'
delete from prescription_items where prescription_id ='19'

update  appointments set patient_details_id ='1' where patient_id ='2'

select * from medicine;

select * from appointments where appointment_id='24';

delete  from doctor_unavailability where unavailability_id ='1';

select * from doctors;
select * from doctors;
delete from appointments where doctor_id is null;
select * from symptoms;

select * from technical_requests;

desc technical_requests;

desc technical_requests;
select distinct symptoms from appointments where symptoms is not null;

select * from appointments where doctor_id is  null;

update appointments set doctor_id ='1' where appointment_id ='1'

select * from technical_requests;

    select
        tr1_0.id,
        tr1_0.issue_type,
        tr1_0.issue_description,
        tr1_0.status,
        tr1_0.created_at 
    from
        technical_requests tr1_0 
    join
        users pi1_0 
            on pi1_0.user_id=tr1_0.patient_id 
    where
        pi1_0.email_id='pujitha.s97@gmail.com'
truncate technical_requests;
SELECT * FROM APPOINTMENTS WHERE APPOINTMENT_ID  ='40';
select * from users;
select * from feedback;
desc appointments;

select * from prescription_items;
select * from doctors;
SELECT d.doctor_name as doctorName, AVG(f.rating) as rating FROM feedback f join appointments a join doctors d on f.appointment_id = a.appointment_id and d.doctor_id = a.doctor_id  GROUP BY d.doctor_id
desc prescription_items;
SELECT * FROM PRESCRIPTION WHERE APPOINTMENT_ID= (SELECT APPOINTMENT FROM APPOINTMENT WHERE DOCTOR_ID IS NULL)

select * from feedback;
8
select * from otp_entry;

truncate table otp_entry;


select * from doctors;

select * from symptoms;

select * from doctors;

alter table doctors drop column rating

select * from doctor_unavailability where doctor_id = '1'

delete from doctor_unavailability where unavailability_id = '19' where appointment_da
select * from appointments  where doctor_id ='1' and appointment_date ='2024-05-22';

update  appointments set appointment_time ='15:00:00' where appointment_id ='63'

select * from feedback;

select * from symptoms;

select * from doctors;

    select
        d1_0.email_id 
    from
        doctors d1_0 
    where
        d1_0.speciality='General Physician'
select * from doctors;

select * from users;
delete from users where user_id='21'
delete from doctors where doctor_id='6'
insert into symptoms (symptom_name, speciality) values ('Heart-Stroke', 'Cardiology');
insert into symptoms (symptom_name, speciality) values ('amnesia', 'Neurology');
insert into symptoms (symptom_name, speciality) values ('leg pain,leg fracture,sprain,hand,hand fracture,hand pain', 'Orthopedic');

select distinct speciality from symptoms where 

select * from user_profile;
select * from users;
select * from appointments where appointment_id='38'

select count(*), appointment_id from prescription where patient_id ='2' group by appointment_id

select * from prescription where appointment_id='80'
select * from prescription_items where prescription_id='38'

SELECT 
		p.prescriptionId as prescriptionId, 
		d.doctorName as doctorName, 
	           p.appointment.appointmentId as appointmentId,
			p.dateIssued as dateIssued, 
	           p.status as status, 
	           p.paymentStatus as paymentStatus, 
	           p.transactionId as transactionId,
	           p.trackingNumber as trackingNumber
	           FROM Prescription p JOIN p.doctor d 
	           WHERE p.patient.userId = '2' order by p.prescriptionId desc
               
               select * from patient_details;
               
               
                   select
        p1_0.prescription_id,
        d1_0.doctor_name,
        p1_0.appointment_id,
        p1_0.date_issued,
        p1_0.status,
        p1_0.payment_status,
        p1_0.transaction_id,
        p1_0.tracking_number 
    from
        prescription p1_0 
    join
        doctors d1_0 
            on d1_0.doctor_id=p1_0.doctor_id 
    where
        p1_0.patient_id='2'
    order by
        p1_0.prescription_id desc 
        
            select
        du1_0.unavailability_id,
        du1_0.unavailable_start_day,
        du1_0.unavailable_end_day,
        du1_0.unavailable_reason 
    from
        doctor_unavailability du1_0 
    where
        du1_0.doctor_id=? 
        select * from prescription wher
        select count(*), appointment_id from prescription group by  appointment_id
        select prescription_id from prescription  where appointment_id in (17,18,38,42,47,55,56,62,72,78,80)
        delete from prescription_items where prescription_id in (7,20,2,19,23,4,13,14,15,16,1,28,24,33,25,35,29,34,32,37,38,41,42,39,40)
        delete from prescription where prescription_id in (7,20,2,19,23,4,13,14,15,16,1,28,24,33,25,35,29,34,32,37,38,41,42,39,40)
               select * from appointments where appointment_id ='79'
               update  appointments set appointment_date ='2024-05-24', appointment_time='14:30:00'  where appointment_id ='80'
               
                   select
        d1_0.doctor_name,
        avg(f1_0.rating) 
    from
        feedback f1_0 
    join
        appointments a1_0 
            on a1_0.appointment_id=f1_0.appointment_id 
    join
        doctors d1_0 
            on d1_0.doctor_id=a1_0.doctor_id 
    group by
        a1_0.doctor_id
        
        select * from users;
        delete from users where user_id='9'
        
        select * from otp_entry;
        
        delete  from users where user_id='26'