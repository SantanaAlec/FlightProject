import { DeleteResult, Repository } from "typeorm";
import { Payment } from "../entities/Payment";
import { PaymentRegisterDTO } from "../dto/payment/PaymentRegisterDTO";
import { PaymentRegisterSuccessDTO } from "../dto/payment/PaymentRegisterSuccessDTO";
import { PaymentUpdateDTO } from "../dto/payment/PaymentUpdateDTO";
import { PaymentUpdateSuccessDTO } from "../dto/payment/PaymentUpdateSuccessDTO";

export class PaymentService {
    private paymentRepository: Repository<Payment>;
    constructor(paymentRepository: Repository<Payment>) {
        this.paymentRepository = paymentRepository;
    }

    
}