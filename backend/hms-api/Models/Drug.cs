using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Models
{
    public class Drug
    {
        public Drug()
        {
            Id = Guid.NewGuid().ToString();
            IsTablet = false;
            IsLiquid = false;
            IsInhaler = false;
            IsPowder = false;
        }

        public string Id { get; set; }
        public string SKU { get; set; }
        public string Name { get; set; }
        public string GenericName { get; set; }
        public string Manufacturer { get; set; }
        public string Measurment { get; set; }
        public bool IsTablet { get; set; }
        public bool IsLiquid { get; set; }
        public bool IsInhaler { get; set; }
        public bool IsPowder { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal CostPricePerContainer { get; set; }
        public int QuantityPerContainer { get; set; }
        public int ContainersPerCarton { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal DefaultPricePerUnit { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal DefaultPricePerContainer { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal DefaultPricePerCarton { get; set; }

        
        public IList<DrugPrice> DrugPrices { get; set; }
    }
}
