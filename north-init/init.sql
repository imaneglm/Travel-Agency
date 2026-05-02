

BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE Trip_Services CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE Trips CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE Services CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

-- =========================
-- CREATE TABLES
-- =========================

CREATE TABLE Services (
  service_id  NUMBER PRIMARY KEY,
  description VARCHAR2(200),
  price       NUMBER(10,2)
);

CREATE TABLE Trips (
  trip_id     NUMBER PRIMARY KEY,
  destination VARCHAR2(100),
  region      VARCHAR2(10),
  total_cost  NUMBER(10,2)
);

CREATE TABLE Trip_Services (
  trip_id    NUMBER,
  service_id NUMBER,
  PRIMARY KEY (trip_id, service_id),
  FOREIGN KEY (trip_id) REFERENCES Trips(trip_id),
  FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

-- =========================
-- INSERT DATA (NORTH ONLY)
-- =========================

INSERT INTO Services VALUES (1, 'Hotel Paris Centre', 800);
INSERT INTO Services VALUES (2, 'Flight to Paris',    400);
INSERT INTO Services VALUES (3, 'Hotel London City',  950);
INSERT INTO Services VALUES (4, 'Flight to London',   350);
INSERT INTO Services VALUES (5, 'Hotel Rome Classic', 700);
INSERT INTO Services VALUES (6, 'Flight to Rome',     300);

INSERT INTO Trips VALUES (1, 'Paris',  'NORTH', 1200);
INSERT INTO Trips VALUES (2, 'London', 'NORTH', 1300);
INSERT INTO Trips VALUES (3, 'Rome',   'NORTH', 1000);

INSERT INTO Trip_Services VALUES (1, 1);
INSERT INTO Trip_Services VALUES (1, 2);
INSERT INTO Trip_Services VALUES (2, 3);
INSERT INTO Trip_Services VALUES (2, 4);
INSERT INTO Trip_Services VALUES (3, 5);
INSERT INTO Trip_Services VALUES (3, 6);

COMMIT;