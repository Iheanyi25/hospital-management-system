using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Models
{
    public class DrugDispensing
    {
        public DrugDispensing()
        {
            Id = Guid.NewGuid().ToString();
            PaymentStatus = "Not Paid";
        }
        public string Id { get; set; }
        public string PaymentStatus { get; set; }


        [ForeignKey("DrugDispensingInvoice")]
        public string DrugDispensingInvoiceId { get; set; }
        public virtual DrugDispensingInvoice DrugDispensingInvoice { get; set; }

        public string DrugId { get; set; }
        public virtual Drug Drug { get; set; }
        public int NumberOfCartons { get; set; }
        public int NumberOfContainers { get; set; }
        public int NumberOfUnits { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal AmountToBePaidByPatient { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public string PriceCalculationFormular { get; set; }
        
    }
}
