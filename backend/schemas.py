from pydantic import BaseModel, EmailStr
from datetime import date
from decimal import Decimal


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str
    phone: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class PropertyCreate(BaseModel):
    property_name: str
    address: str
    city: str
    state: str
    zipcode: str


class UnitCreate(BaseModel):
    property_id: int
    unit_number: str
    rent_amount: Decimal
    status: str


class LeaseCreate(BaseModel):
    tenant_id: int
    unit_id: int
    start_date: date
    end_date: date
    monthly_rent: Decimal
    status: str = "active"


class RentPaymentCreate(BaseModel):
    lease_id: int
    amount: Decimal
    payment_date: date
    payment_status: str


class MaintenanceRequestCreate(BaseModel):
    unit_id: int
    issue_title: str
    issue_description: str
    priority: str
    status: str = "open"