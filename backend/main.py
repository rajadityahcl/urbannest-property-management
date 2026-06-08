from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, get_db
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    require_admin
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="UrbanNest API with JWT Auth")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "UrbanNest API is running"}


@app.post("/register")
def register(user: schemas.UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(user.password),
        role=user.role,
        phone=user.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.user_id,
        "role": new_user.role
    }


@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(
        data={
            "sub": db_user.email,
            "role": db_user.role,
            "user_id": db_user.user_id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role,
        "user_id": db_user.user_id,
        "full_name": db_user.full_name
    }


@app.get("/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    return {
        "user_id": current_user.user_id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role
    }


@app.post("/properties")
def create_property(
    property_data: schemas.PropertyCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):
    new_property = models.Property(
        admin_id=current_user.user_id,
        property_name=property_data.property_name,
        address=property_data.address,
        city=property_data.city,
        state=property_data.state,
        zipcode=property_data.zipcode
    )

    db.add(new_property)
    db.commit()
    db.refresh(new_property)

    return new_property


@app.get("/properties")
def get_properties(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Property).all()


@app.post("/maintenance-requests")
def create_maintenance_request(
    request: schemas.MaintenanceRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_request = models.MaintenanceRequest(
        tenant_id=current_user.user_id,
        unit_id=request.unit_id,
        issue_title=request.issue_title,
        issue_description=request.issue_description,
        priority=request.priority,
        status=request.status
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return new_request


@app.get("/maintenance-requests")
def get_maintenance_requests(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role == "admin":
        return db.query(models.MaintenanceRequest).all()

    return db.query(models.MaintenanceRequest).filter(
        models.MaintenanceRequest.tenant_id == current_user.user_id
    ).all()


@app.get("/dashboard-summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return {
        "logged_in_as": current_user.full_name,
        "role": current_user.role,
        "total_users": db.query(models.User).count(),
        "total_properties": db.query(models.Property).count(),
        "total_units": db.query(models.Unit).count(),
        "occupied_units": db.query(models.Unit).filter(models.Unit.status == "occupied").count(),
        "available_units": db.query(models.Unit).filter(models.Unit.status == "available").count(),
        "open_requests": db.query(models.MaintenanceRequest).filter(models.MaintenanceRequest.status == "open").count(),
        "rent_payments": db.query(models.RentPayment).count()
    }