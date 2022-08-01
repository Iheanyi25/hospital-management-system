using HMS.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Areas.Accountant.Dtos
{
    public class TransactionsDtoForView
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PaymentMethod { get; set; }
    }

    public class TransactionTypeDtoForView
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string TransactionType { get; set; }
    }

    public class PatientHMOInvoiceDtoForView
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PatientId { get; set; }
        public string HMOId { get; set; }
    }

    public class DrugHMOInvoiceDtoForView
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string DrugId { get; set; }
        public string HMOId { get; set; }
    }

    public class ServiceHMOInvoiceDtoForView
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ServiceId { get; set; }
        public string HMOId { get; set; }
    }

    public class TransactionInvoiceResponseDto
    {
        public string Id { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public string PatientName { get; set; }
        public string TransactionType { get; set; }
        public string InvoiceType { get; set; }
        public string InvoiceId { get; set; }
        public string TransactionReference { get; set; }
        public string PaymentMethod { get; set; }
        public string FileNumber { get; set; }
        public DateTime TrasactionDate { get; set; }
        public string BenefactorAdmissionId { get; set; }
        public string BenefactorAccountId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal BenefactorAccountPreviousBalance { get; set; }
        public string BenefactorName { get; set; }
        public string InitiatorName { get; set; }
        public string PatientId { get; set; }
        public string BenefactorId { get; set; }
        public string InitiatorId { get; set; }
        public string DepositorsName { get; set; }
    }

}
