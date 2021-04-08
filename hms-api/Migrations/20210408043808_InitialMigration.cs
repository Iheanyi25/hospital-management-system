using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HMS.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    OtherNames = table.Column<string>(nullable: true),
                    ProfileImageUrl = table.Column<string>(nullable: true),
                    UserType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Drugs",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    SKU = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    GenericName = table.Column<string>(nullable: true),
                    Manufacturer = table.Column<string>(nullable: true),
                    Measurment = table.Column<string>(nullable: true),
                    DrugType = table.Column<string>(nullable: true),
                    CostPricePerContainer = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuantityPerContainer = table.Column<int>(nullable: false),
                    ContainersPerCarton = table.Column<int>(nullable: false),
                    DefaultPricePerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DefaultPricePerContainer = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DefaultPricePerCarton = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drugs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HealthPlans",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Renewal = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    NoOfPatients = table.Column<int>(nullable: false),
                    NoOfAccounts = table.Column<int>(nullable: false),
                    InstantBilling = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceCategories",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Wards",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Capacity = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ChargePerNight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsAvailable = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AccountantProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    AccountantId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountantProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountantProfiles_AspNetUsers_AccountantId",
                        column: x => x.AccountantId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdminProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    AdminId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminProfiles_AspNetUsers_AdminId",
                        column: x => x.AdminId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Consultations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DateOfConsultation = table.Column<DateTime>(nullable: false),
                    IsCanceled = table.Column<bool>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false),
                    IsExpired = table.Column<bool>(nullable: false),
                    IsPending = table.Column<bool>(nullable: false),
                    ConsultationTitle = table.Column<string>(nullable: true),
                    ReasonForConsultation = table.Column<string>(nullable: true),
                    IsPatientSentHome = table.Column<bool>(nullable: false),
                    IsPatientAdmitted = table.Column<bool>(nullable: false),
                    IsNewPatient = table.Column<bool>(nullable: false),
                    DoctorId = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Consultations_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Consultations_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorAppointments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AppointmentDate = table.Column<DateTime>(nullable: false),
                    AppointmentTime = table.Column<DateTime>(nullable: false),
                    AppointmentTitle = table.Column<string>(nullable: true),
                    ReasonForAppointment = table.Column<string>(nullable: true),
                    IsPending = table.Column<bool>(nullable: false),
                    IsAccepted = table.Column<bool>(nullable: false),
                    IsRejected = table.Column<bool>(nullable: false),
                    ReasonForRejection = table.Column<string>(nullable: true),
                    IsCanceled = table.Column<bool>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false),
                    IsExpired = table.Column<bool>(nullable: false),
                    IsCanceledByDoctor = table.Column<bool>(nullable: false),
                    IsPatientSentHome = table.Column<bool>(nullable: false),
                    IsPatientAdmitted = table.Column<bool>(nullable: false),
                    DoctorId = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorAppointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorAppointments_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DoctorAppointments_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    isAvailable = table.Column<bool>(nullable: false),
                    DoctorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorProfiles_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LabProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    LabAttendantId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LabProfiles_AspNetUsers_LabAttendantId",
                        column: x => x.LabAttendantId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MyPatients",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DoctorId = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MyPatients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MyPatients_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MyPatients_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NurseProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    isAvailable = table.Column<bool>(nullable: false),
                    NurseId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NurseProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NurseProfiles_AspNetUsers_NurseId",
                        column: x => x.NurseId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PatientPreConsultation",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    BloodPressure = table.Column<string>(nullable: true),
                    Pulse = table.Column<string>(nullable: true),
                    Respiration = table.Column<string>(nullable: true),
                    SPO2 = table.Column<string>(nullable: true),
                    Temperature = table.Column<string>(nullable: true),
                    Weight = table.Column<string>(nullable: true),
                    Height = table.Column<string>(nullable: true),
                    CalculatedBMI = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    PatientId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientPreConsultation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatientPreConsultation_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PharmacyProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    PharmacistId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PharmacyProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PharmacyProfiles_AspNetUsers_PharmacistId",
                        column: x => x.PharmacistId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServiceInvoices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AmountTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AmountToBePaidByPatient = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AmountToBePaidByHMO = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PriceCalculationFormular = table.Column<string>(nullable: true),
                    PaymentStatus = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    GeneratedBy = table.Column<string>(nullable: true),
                    PaymentMethod = table.Column<string>(nullable: true),
                    InvoiceNumber = table.Column<string>(nullable: true),
                    DatePaid = table.Column<DateTime>(nullable: false),
                    DateGenerated = table.Column<DateTime>(nullable: false),
                    PatientId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceInvoices_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WardPersonnelProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    WardPersonnelId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WardPersonnelProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WardPersonnelProfiles_AspNetUsers_WardPersonnelId",
                        column: x => x.WardPersonnelId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DrugBatches",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DrugId = table.Column<string>(nullable: true),
                    QuantityInStock = table.Column<int>(nullable: false),
                    ExpiryDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrugBatches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrugBatches_Drugs_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drugs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    AccountNumber = table.Column<string>(nullable: true),
                    AccountBalance = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    HealthPlanId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_HealthPlans_HealthPlanId",
                        column: x => x.HealthPlanId,
                        principalTable: "HealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DrugPrices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DrugId = table.Column<string>(nullable: true),
                    HealthPlanId = table.Column<string>(nullable: true),
                    PricePerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PricePerContainer = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PricePerCarton = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrugPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrugPrices_Drugs_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drugs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DrugPrices_HealthPlans_HealthPlanId",
                        column: x => x.HealthPlanId,
                        principalTable: "HealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOs",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    HealthPlanId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOs_HealthPlans_HealthPlanId",
                        column: x => x.HealthPlanId,
                        principalTable: "HealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NHISHealthPlans",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Percentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    HealthPlanId = table.Column<string>(nullable: true),
                    RequireAuthorizationCode = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NHISHealthPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NHISHealthPlans_HealthPlans_HealthPlanId",
                        column: x => x.HealthPlanId,
                        principalTable: "HealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RegistrationInvoices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    InvoiceNumber = table.Column<string>(nullable: true),
                    PaymentStatus = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    GeneratedBy = table.Column<string>(nullable: true),
                    PaymentMethod = table.Column<string>(nullable: true),
                    TransactionReference = table.Column<string>(nullable: true),
                    DatePaid = table.Column<DateTime>(nullable: false),
                    DateGenerated = table.Column<DateTime>(nullable: false),
                    HealthPlanId = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistrationInvoices_HealthPlans_HealthPlanId",
                        column: x => x.HealthPlanId,
                        principalTable: "HealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RegistrationInvoices_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ServiceCategoryId = table.Column<string>(nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_ServiceCategories_ServiceCategoryId",
                        column: x => x.ServiceCategoryId,
                        principalTable: "ServiceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Beds",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    WardId = table.Column<string>(nullable: true),
                    IsAvailable = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Beds_Wards_WardId",
                        column: x => x.WardId,
                        principalTable: "Wards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorClerkings",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    SocialHistory = table.Column<string>(nullable: true),
                    FamilyHistory = table.Column<string>(nullable: true),
                    MedicalHistory = table.Column<string>(nullable: true),
                    LastCountryVisited = table.Column<string>(nullable: true),
                    DateOfVisitation = table.Column<string>(nullable: true),
                    PresentingComplaints = table.Column<string>(nullable: true),
                    HistoryOfPresentingComplaints = table.Column<string>(nullable: true),
                    ReviewOfSystem = table.Column<string>(nullable: true),
                    PhysicalExamination = table.Column<string>(nullable: true),
                    Diagnosis = table.Column<string>(nullable: true),
                    TreatmentPlan = table.Column<string>(nullable: true),
                    ObstetricsAndGynecology = table.Column<string>(nullable: true),
                    Prescription = table.Column<string>(nullable: true),
                    DateOfClerking = table.Column<DateTime>(nullable: false),
                    ConsultationId = table.Column<string>(nullable: true),
                    AppointmentId = table.Column<string>(nullable: true),
                    DoctorId = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorClerkings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorClerkings_DoctorAppointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "DoctorAppointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DoctorClerkings_Consultations_ConsultationId",
                        column: x => x.ConsultationId,
                        principalTable: "Consultations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DoctorClerkings_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DoctorClerkings_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Surgeries",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ReferralNote = table.Column<string>(nullable: true),
                    HospitalistService = table.Column<bool>(nullable: false),
                    MedSurgService = table.Column<bool>(nullable: false),
                    ICU = table.Column<bool>(nullable: false),
                    TELE = table.Column<bool>(nullable: false),
                    SurgeryAndDiagnosis = table.Column<string>(nullable: true),
                    SecondaryDiagnosis = table.Column<string>(nullable: true),
                    Allergies = table.Column<bool>(nullable: false),
                    AdvancedDirectives = table.Column<string>(nullable: true),
                    Dietary = table.Column<string>(nullable: true),
                    VsFrequency = table.Column<string>(nullable: true),
                    IAndDWeightDaily = table.Column<bool>(nullable: false),
                    BedRest = table.Column<bool>(nullable: false),
                    OOBToChain = table.Column<bool>(nullable: false),
                    AMBAsTol = table.Column<bool>(nullable: false),
                    ManagementPerPDHPolicy = table.Column<bool>(nullable: false),
                    JacksonPratt = table.Column<bool>(nullable: false),
                    Hamovac = table.Column<bool>(nullable: false),
                    Penrose = table.Column<bool>(nullable: false),
                    Dressing = table.Column<string>(nullable: true),
                    HRLowerLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    HRUpperLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RPLowerLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RPUpperLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SBPLowerLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SBPUpperLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TemperatureLowerLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TemperatureUpperLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DPBLowerLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DPBUpperLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SPO2LowerLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SPO2UpperLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UrineOutput = table.Column<bool>(nullable: false),
                    Haemoglobin = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UnusualWoundDrainage = table.Column<bool>(nullable: false),
                    Pantoprazole = table.Column<bool>(nullable: false),
                    Famotidine = table.Column<bool>(nullable: false),
                    InfectionPrevention = table.Column<string>(nullable: true),
                    RespiratoryCare = table.Column<string>(nullable: true),
                    PostOperationMedication = table.Column<string>(nullable: true),
                    Surgeons = table.Column<string>(nullable: true),
                    Anasthetics = table.Column<string>(nullable: true),
                    Operation = table.Column<string>(nullable: true),
                    SurgeryIndication = table.Column<string>(nullable: true),
                    OperationProcedure = table.Column<string>(nullable: true),
                    AppointmentId = table.Column<string>(nullable: true),
                    ConsultationId = table.Column<string>(nullable: true),
                    InitiatorId = table.Column<string>(nullable: true),
                    DoctorId = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true),
                    DateOfSurgery = table.Column<DateTime>(nullable: false),
                    TimeOfSurgery = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surgeries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Surgeries_DoctorAppointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "DoctorAppointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Surgeries_Consultations_ConsultationId",
                        column: x => x.ConsultationId,
                        principalTable: "Consultations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Surgeries_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Surgeries_AspNetUsers_InitiatorId",
                        column: x => x.InitiatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Surgeries_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorEducations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Degree = table.Column<string>(nullable: true),
                    Institution = table.Column<string>(nullable: true),
                    StartYear = table.Column<string>(nullable: true),
                    EndYear = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdateAt = table.Column<DateTime>(nullable: true),
                    DoctorProfileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorEducations_DoctorProfiles_DoctorProfileId",
                        column: x => x.DoctorProfileId,
                        principalTable: "DoctorProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorExperiences",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Role = table.Column<string>(nullable: true),
                    Company = table.Column<string>(nullable: true),
                    StartYear = table.Column<string>(nullable: true),
                    EndYear = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdateAt = table.Column<DateTime>(nullable: true),
                    DoctorProfileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorExperiences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorExperiences_DoctorProfiles_DoctorProfileId",
                        column: x => x.DoctorProfileId,
                        principalTable: "DoctorProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorOfficeTimes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    WorkDays = table.Column<string>(nullable: true),
                    StartTime = table.Column<string>(nullable: true),
                    EndTime = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdateAt = table.Column<DateTime>(nullable: true),
                    DoctorProfileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorOfficeTimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorOfficeTimes_DoctorProfiles_DoctorProfileId",
                        column: x => x.DoctorProfileId,
                        principalTable: "DoctorProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorSocials",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    WebSite = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdateAt = table.Column<DateTime>(nullable: true),
                    DoctorProfileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorSocials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorSocials_DoctorProfiles_DoctorProfileId",
                        column: x => x.DoctorProfileId,
                        principalTable: "DoctorProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoctorSpecializations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Specialization = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdateAt = table.Column<DateTime>(nullable: true),
                    DoctorProfileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorSpecializations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorSpecializations_DoctorProfiles_DoctorProfileId",
                        column: x => x.DoctorProfileId,
                        principalTable: "DoctorProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AccountInvoices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    InvoiceNumber = table.Column<string>(nullable: true),
                    PaymentStatus = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    GeneratedBy = table.Column<string>(nullable: true),
                    PaymentMethod = table.Column<string>(nullable: true),
                    TransactionReference = table.Column<string>(nullable: true),
                    DatePaid = table.Column<DateTime>(nullable: false),
                    DateGenerated = table.Column<DateTime>(nullable: false),
                    AccountId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountInvoices_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FileNumber = table.Column<string>(nullable: true),
                    AccountId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Files_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOAdminProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    HMOId = table.Column<string>(nullable: true),
                    HMOAdminId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOAdminProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOAdminProfiles_AspNetUsers_HMOAdminId",
                        column: x => x.HMOAdminId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HMOAdminProfiles_HMOs_HMOId",
                        column: x => x.HMOId,
                        principalTable: "HMOs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOHealthPlans",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    HMOId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOHealthPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOHealthPlans_HMOs_HMOId",
                        column: x => x.HMOId,
                        principalTable: "HMOs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOUserGroups",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    HMOId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOUserGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOUserGroups_HMOs_HMOId",
                        column: x => x.HMOId,
                        principalTable: "HMOs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NHISHealthPlanDrugs",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DrugId = table.Column<string>(nullable: true),
                    NHISHealthPlanId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NHISHealthPlanDrugs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NHISHealthPlanDrugs_Drugs_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drugs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NHISHealthPlanDrugs_NHISHealthPlans_NHISHealthPlanId",
                        column: x => x.NHISHealthPlanId,
                        principalTable: "NHISHealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NHISHealthPlanPatients",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    PatientId = table.Column<string>(nullable: true),
                    NHISHealthPlanId = table.Column<string>(nullable: true),
                    AuthorizationCode = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NHISHealthPlanPatients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NHISHealthPlanPatients_NHISHealthPlans_NHISHealthPlanId",
                        column: x => x.NHISHealthPlanId,
                        principalTable: "NHISHealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NHISHealthPlanPatients_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NHISHealthPlanServices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ServiceId = table.Column<string>(nullable: true),
                    NHISHealthPlanId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NHISHealthPlanServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NHISHealthPlanServices_NHISHealthPlans_NHISHealthPlanId",
                        column: x => x.NHISHealthPlanId,
                        principalTable: "NHISHealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NHISHealthPlanServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRequests",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PaymentStatus = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    ServiceInvoiceId = table.Column<string>(nullable: true),
                    ServiceId = table.Column<string>(nullable: true),
                    AppointmentId = table.Column<string>(nullable: true),
                    ConsultationId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceRequests_DoctorAppointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "DoctorAppointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ServiceRequests_Consultations_ConsultationId",
                        column: x => x.ConsultationId,
                        principalTable: "Consultations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ServiceRequests_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ServiceRequests_ServiceInvoices_ServiceInvoiceId",
                        column: x => x.ServiceInvoiceId,
                        principalTable: "ServiceInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Admissions",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AdmissionNote = table.Column<string>(nullable: true),
                    DateOfReferral = table.Column<DateTime>(nullable: false),
                    DateOfAdmission = table.Column<DateTime>(nullable: false),
                    DischargeNote = table.Column<string>(nullable: true),
                    DateOfDischarge = table.Column<DateTime>(nullable: false),
                    IsDischarged = table.Column<bool>(nullable: false),
                    PatientId = table.Column<string>(nullable: true),
                    BedId = table.Column<string>(nullable: true),
                    AppointmentId = table.Column<string>(nullable: true),
                    ConsultationId = table.Column<string>(nullable: true),
                    DoctorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Admissions_Beds_BedId",
                        column: x => x.BedId,
                        principalTable: "Beds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Admissions_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Admissions_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DrugDispensingInvoices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    InvoiceNumber = table.Column<string>(nullable: true),
                    AmountTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AmountToBePaidByPatient = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AmountToBePaidByHMO = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentStatus = table.Column<string>(nullable: true),
                    GeneratedBy = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true),
                    DateGenerated = table.Column<DateTime>(nullable: false),
                    PaymentMethod = table.Column<string>(nullable: true),
                    PaymentReference = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DatePaid = table.Column<DateTime>(nullable: false),
                    PriceCalculationFormular = table.Column<string>(nullable: true),
                    IsDispensed = table.Column<bool>(nullable: false),
                    ClerkingId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrugDispensingInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrugDispensingInvoices_DoctorClerkings_ClerkingId",
                        column: x => x.ClerkingId,
                        principalTable: "DoctorClerkings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DrugDispensingInvoices_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PatientProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FileNumber = table.Column<string>(nullable: true),
                    AccountNumber = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    BloodGroup = table.Column<string>(nullable: true),
                    GenoType = table.Column<string>(nullable: true),
                    Allergies = table.Column<string>(nullable: true),
                    Disabilities = table.Column<string>(nullable: true),
                    Diabetic = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    PatientId = table.Column<string>(nullable: true),
                    AccountId = table.Column<string>(nullable: true),
                    FileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatientProfiles_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PatientProfiles_Files_FileId",
                        column: x => x.FileId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PatientProfiles_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOHealthPlanDrugPrices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DrugId = table.Column<string>(nullable: true),
                    HMOHealthPlanId = table.Column<string>(nullable: true),
                    PricePerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PricePerContainer = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PricePerCarton = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOHealthPlanDrugPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOHealthPlanDrugPrices_Drugs_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drugs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HMOHealthPlanDrugPrices_HMOHealthPlans_HMOHealthPlanId",
                        column: x => x.HMOHealthPlanId,
                        principalTable: "HMOHealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOHealthPlanPatients",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    PatientId = table.Column<string>(nullable: true),
                    HMOHealthPlanId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOHealthPlanPatients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOHealthPlanPatients_HMOHealthPlans_HMOHealthPlanId",
                        column: x => x.HMOHealthPlanId,
                        principalTable: "HMOHealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HMOHealthPlanPatients_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOHealthPlanServicePrices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ServiceId = table.Column<string>(nullable: true),
                    HMOHealthPlanId = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOHealthPlanServicePrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOHealthPlanServicePrices_HMOHealthPlans_HMOHealthPlanId",
                        column: x => x.HMOHealthPlanId,
                        principalTable: "HMOHealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HMOHealthPlanServicePrices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOSubUserGroups",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    HMOUserGroupId = table.Column<string>(nullable: true),
                    HMOHealthPlanId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOSubUserGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOSubUserGroups_HMOHealthPlans_HMOHealthPlanId",
                        column: x => x.HMOHealthPlanId,
                        principalTable: "HMOHealthPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HMOSubUserGroups_HMOUserGroups_HMOUserGroupId",
                        column: x => x.HMOUserGroupId,
                        principalTable: "HMOUserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRequestResults",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Result = table.Column<string>(nullable: true),
                    AdditionalComments = table.Column<string>(nullable: true),
                    ServiceRequestId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRequestResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceRequestResults_ServiceRequests_ServiceRequestId",
                        column: x => x.ServiceRequestId,
                        principalTable: "ServiceRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionDrugMedications",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DrugId = table.Column<string>(nullable: true),
                    AdministrationInstruction = table.Column<string>(nullable: true),
                    Dosage = table.Column<string>(nullable: true),
                    Frequency = table.Column<string>(nullable: true),
                    StartDate = table.Column<string>(nullable: true),
                    EndDate = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    AdmissionId = table.Column<string>(nullable: true),
                    InitiatorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionDrugMedications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionDrugMedications_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionDrugMedications_Drugs_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drugs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionDrugMedications_AspNetUsers_InitiatorId",
                        column: x => x.InitiatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionInvoices",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    InvoiceNumber = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AmountPaid = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AmountToBePaidByPatient = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AmountToBePaidByHMO = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentStatus = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    GeneratedBy = table.Column<string>(nullable: true),
                    PaymentMethod = table.Column<string>(nullable: true),
                    TransactionReference = table.Column<string>(nullable: true),
                    PriceCalculationFormula = table.Column<string>(nullable: true),
                    DateGenerated = table.Column<DateTime>(nullable: false),
                    DatePaid = table.Column<DateTime>(nullable: false),
                    AdmissionId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionInvoices_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionNotes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Note = table.Column<string>(nullable: true),
                    AdmissionId = table.Column<string>(nullable: true),
                    DoctorId = table.Column<string>(nullable: true),
                    DateGenerated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionNotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionNotes_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionNotes_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionPrescriptions",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Prescription = table.Column<string>(nullable: true),
                    AdmissionId = table.Column<string>(nullable: true),
                    DoctorId = table.Column<string>(nullable: true),
                    DateGenerated = table.Column<DateTime>(nullable: false),
                    IsCosted = table.Column<bool>(nullable: false),
                    IsDispensed = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionPrescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionPrescriptions_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionPrescriptions_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionServiceMedications",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ServiceId = table.Column<string>(nullable: true),
                    AdministrationInstruction = table.Column<string>(nullable: true),
                    Dosage = table.Column<string>(nullable: true),
                    Frequency = table.Column<string>(nullable: true),
                    StartDate = table.Column<string>(nullable: true),
                    EndDate = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    AdmissionId = table.Column<string>(nullable: true),
                    InitiatorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionServiceMedications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionServiceMedications_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionServiceMedications_AspNetUsers_InitiatorId",
                        column: x => x.InitiatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionServiceMedications_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ObservationCharts",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    BloodPressure = table.Column<string>(nullable: true),
                    Pulse = table.Column<string>(nullable: true),
                    Respiration = table.Column<string>(nullable: true),
                    SPO2 = table.Column<string>(nullable: true),
                    Temperature = table.Column<string>(nullable: true),
                    Remarks = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    AdmissionId = table.Column<string>(nullable: true),
                    InitiatorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObservationCharts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ObservationCharts_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ObservationCharts_AspNetUsers_InitiatorId",
                        column: x => x.InitiatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TransactionType = table.Column<string>(nullable: true),
                    InvoiceType = table.Column<string>(nullable: true),
                    InvoiceId = table.Column<string>(nullable: true),
                    PaymentMethod = table.Column<string>(nullable: true),
                    TrasactionDate = table.Column<DateTime>(nullable: false),
                    BenefactorAdmissionId = table.Column<string>(nullable: true),
                    BenefactorAccountId = table.Column<string>(nullable: true),
                    BenefactorAccountPreviousBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BenefactorId = table.Column<string>(nullable: true),
                    InitiatorId = table.Column<string>(nullable: true),
                    DepositorsName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_BenefactorAccountId",
                        column: x => x.BenefactorAccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transactions_Admissions_BenefactorAdmissionId",
                        column: x => x.BenefactorAdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transactions_AspNetUsers_BenefactorId",
                        column: x => x.BenefactorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transactions_AspNetUsers_InitiatorId",
                        column: x => x.InitiatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DrugDispensings",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    PaymentStatus = table.Column<string>(nullable: true),
                    DrugDispensingInvoiceId = table.Column<string>(nullable: true),
                    DrugId = table.Column<string>(nullable: true),
                    NumberOfCartons = table.Column<int>(nullable: false),
                    NumberOfContainers = table.Column<int>(nullable: false),
                    NumberOfUnits = table.Column<int>(nullable: false),
                    TotalCartonPrice = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    TotalContainerPrice = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    TotalUnitPrice = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PriceTotal = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PriceCalculationFormular = table.Column<string>(nullable: true),
                    ClerkingId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrugDispensings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrugDispensings_DoctorClerkings_ClerkingId",
                        column: x => x.ClerkingId,
                        principalTable: "DoctorClerkings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DrugDispensings_DrugDispensingInvoices_DrugDispensingInvoiceId",
                        column: x => x.DrugDispensingInvoiceId,
                        principalTable: "DrugDispensingInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DrugDispensings_Drugs_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drugs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HMOSubUserGroupPatients",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    PatientId = table.Column<string>(nullable: true),
                    HMOSubUserGroupId = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HMOSubUserGroupPatients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HMOSubUserGroupPatients_HMOSubUserGroups_HMOSubUserGroupId",
                        column: x => x.HMOSubUserGroupId,
                        principalTable: "HMOSubUserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HMOSubUserGroupPatients_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRequestResultImages",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    ImageURL = table.Column<string>(nullable: true),
                    ServiceRequestResultId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRequestResultImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceRequestResultImages_ServiceRequestResults_ServiceRequestResultId",
                        column: x => x.ServiceRequestResultId,
                        principalTable: "ServiceRequestResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionDrugDispensings",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DrugId = table.Column<string>(nullable: true),
                    NumberOfCartons = table.Column<int>(nullable: false),
                    NumberOfContainers = table.Column<int>(nullable: false),
                    NumberOfUnits = table.Column<int>(nullable: false),
                    TotalCartonPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalContainerPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalUnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DrugPriceTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DrugPriceCalculationFormular = table.Column<string>(nullable: true),
                    AdmissionInvoiceId = table.Column<string>(nullable: true),
                    DateDispensed = table.Column<DateTime>(nullable: false),
                    TimeDispensed = table.Column<DateTime>(nullable: false),
                    InitiatorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionDrugDispensings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionDrugDispensings_AdmissionInvoices_AdmissionInvoiceId",
                        column: x => x.AdmissionInvoiceId,
                        principalTable: "AdmissionInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionDrugDispensings_Drugs_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drugs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionServiceRequests",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Status = table.Column<string>(nullable: true),
                    AdmissionInvoiceId = table.Column<string>(nullable: true),
                    ServiceId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionServiceRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionServiceRequests_AdmissionInvoices_AdmissionInvoiceId",
                        column: x => x.AdmissionInvoiceId,
                        principalTable: "AdmissionInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdmissionServiceRequests_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionServiceRequestResults",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Result = table.Column<string>(nullable: true),
                    AdditionalComments = table.Column<string>(nullable: true),
                    ServiceRequestId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionServiceRequestResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionServiceRequestResults_AdmissionServiceRequests_ServiceRequestId",
                        column: x => x.ServiceRequestId,
                        principalTable: "AdmissionServiceRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionServiceRequestResultImages",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    ImageURL = table.Column<string>(nullable: true),
                    ServiceRequestResultId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionServiceRequestResultImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionServiceRequestResultImages_AdmissionServiceRequestResults_ServiceRequestResultId",
                        column: x => x.ServiceRequestResultId,
                        principalTable: "AdmissionServiceRequestResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountantProfiles_AccountantId",
                table: "AccountantProfiles",
                column: "AccountantId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountInvoices_AccountId",
                table: "AccountInvoices",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_HealthPlanId",
                table: "Accounts",
                column: "HealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_AdminProfiles_AdminId",
                table: "AdminProfiles",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionDrugDispensings_AdmissionInvoiceId",
                table: "AdmissionDrugDispensings",
                column: "AdmissionInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionDrugDispensings_DrugId",
                table: "AdmissionDrugDispensings",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionDrugMedications_AdmissionId",
                table: "AdmissionDrugMedications",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionDrugMedications_DrugId",
                table: "AdmissionDrugMedications",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionDrugMedications_InitiatorId",
                table: "AdmissionDrugMedications",
                column: "InitiatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionInvoices_AdmissionId",
                table: "AdmissionInvoices",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionNotes_AdmissionId",
                table: "AdmissionNotes",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionNotes_DoctorId",
                table: "AdmissionNotes",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionPrescriptions_AdmissionId",
                table: "AdmissionPrescriptions",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionPrescriptions_DoctorId",
                table: "AdmissionPrescriptions",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Admissions_BedId",
                table: "Admissions",
                column: "BedId");

            migrationBuilder.CreateIndex(
                name: "IX_Admissions_DoctorId",
                table: "Admissions",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Admissions_PatientId",
                table: "Admissions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionServiceMedications_AdmissionId",
                table: "AdmissionServiceMedications",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionServiceMedications_InitiatorId",
                table: "AdmissionServiceMedications",
                column: "InitiatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionServiceMedications_ServiceId",
                table: "AdmissionServiceMedications",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionServiceRequestResultImages_ServiceRequestResultId",
                table: "AdmissionServiceRequestResultImages",
                column: "ServiceRequestResultId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionServiceRequestResults_ServiceRequestId",
                table: "AdmissionServiceRequestResults",
                column: "ServiceRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionServiceRequests_AdmissionInvoiceId",
                table: "AdmissionServiceRequests",
                column: "AdmissionInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionServiceRequests_ServiceId",
                table: "AdmissionServiceRequests",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Beds_WardId",
                table: "Beds",
                column: "WardId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultations_DoctorId",
                table: "Consultations",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultations_PatientId",
                table: "Consultations",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorAppointments_DoctorId",
                table: "DoctorAppointments",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorAppointments_PatientId",
                table: "DoctorAppointments",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorClerkings_AppointmentId",
                table: "DoctorClerkings",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorClerkings_ConsultationId",
                table: "DoctorClerkings",
                column: "ConsultationId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorClerkings_DoctorId",
                table: "DoctorClerkings",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorClerkings_PatientId",
                table: "DoctorClerkings",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorEducations_DoctorProfileId",
                table: "DoctorEducations",
                column: "DoctorProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorExperiences_DoctorProfileId",
                table: "DoctorExperiences",
                column: "DoctorProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorOfficeTimes_DoctorProfileId",
                table: "DoctorOfficeTimes",
                column: "DoctorProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorProfiles_DoctorId",
                table: "DoctorProfiles",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorSocials_DoctorProfileId",
                table: "DoctorSocials",
                column: "DoctorProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorSpecializations_DoctorProfileId",
                table: "DoctorSpecializations",
                column: "DoctorProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugBatches_DrugId",
                table: "DrugBatches",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugDispensingInvoices_ClerkingId",
                table: "DrugDispensingInvoices",
                column: "ClerkingId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugDispensingInvoices_PatientId",
                table: "DrugDispensingInvoices",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugDispensings_ClerkingId",
                table: "DrugDispensings",
                column: "ClerkingId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugDispensings_DrugDispensingInvoiceId",
                table: "DrugDispensings",
                column: "DrugDispensingInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugDispensings_DrugId",
                table: "DrugDispensings",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugPrices_DrugId",
                table: "DrugPrices",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugPrices_HealthPlanId",
                table: "DrugPrices",
                column: "HealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Files_AccountId",
                table: "Files",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOAdminProfiles_HMOAdminId",
                table: "HMOAdminProfiles",
                column: "HMOAdminId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOAdminProfiles_HMOId",
                table: "HMOAdminProfiles",
                column: "HMOId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOHealthPlanDrugPrices_DrugId",
                table: "HMOHealthPlanDrugPrices",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOHealthPlanDrugPrices_HMOHealthPlanId",
                table: "HMOHealthPlanDrugPrices",
                column: "HMOHealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOHealthPlanPatients_HMOHealthPlanId",
                table: "HMOHealthPlanPatients",
                column: "HMOHealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOHealthPlanPatients_PatientId",
                table: "HMOHealthPlanPatients",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOHealthPlans_HMOId",
                table: "HMOHealthPlans",
                column: "HMOId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOHealthPlanServicePrices_HMOHealthPlanId",
                table: "HMOHealthPlanServicePrices",
                column: "HMOHealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOHealthPlanServicePrices_ServiceId",
                table: "HMOHealthPlanServicePrices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOs_HealthPlanId",
                table: "HMOs",
                column: "HealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOSubUserGroupPatients_HMOSubUserGroupId",
                table: "HMOSubUserGroupPatients",
                column: "HMOSubUserGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOSubUserGroupPatients_PatientId",
                table: "HMOSubUserGroupPatients",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOSubUserGroups_HMOHealthPlanId",
                table: "HMOSubUserGroups",
                column: "HMOHealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOSubUserGroups_HMOUserGroupId",
                table: "HMOSubUserGroups",
                column: "HMOUserGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_HMOUserGroups_HMOId",
                table: "HMOUserGroups",
                column: "HMOId");

            migrationBuilder.CreateIndex(
                name: "IX_LabProfiles_LabAttendantId",
                table: "LabProfiles",
                column: "LabAttendantId");

            migrationBuilder.CreateIndex(
                name: "IX_MyPatients_DoctorId",
                table: "MyPatients",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_MyPatients_PatientId",
                table: "MyPatients",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_NHISHealthPlanDrugs_DrugId",
                table: "NHISHealthPlanDrugs",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_NHISHealthPlanDrugs_NHISHealthPlanId",
                table: "NHISHealthPlanDrugs",
                column: "NHISHealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_NHISHealthPlanPatients_NHISHealthPlanId",
                table: "NHISHealthPlanPatients",
                column: "NHISHealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_NHISHealthPlanPatients_PatientId",
                table: "NHISHealthPlanPatients",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_NHISHealthPlans_HealthPlanId",
                table: "NHISHealthPlans",
                column: "HealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_NHISHealthPlanServices_NHISHealthPlanId",
                table: "NHISHealthPlanServices",
                column: "NHISHealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_NHISHealthPlanServices_ServiceId",
                table: "NHISHealthPlanServices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_NurseProfiles_NurseId",
                table: "NurseProfiles",
                column: "NurseId");

            migrationBuilder.CreateIndex(
                name: "IX_ObservationCharts_AdmissionId",
                table: "ObservationCharts",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_ObservationCharts_InitiatorId",
                table: "ObservationCharts",
                column: "InitiatorId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientPreConsultation_PatientId",
                table: "PatientPreConsultation",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientProfiles_AccountId",
                table: "PatientProfiles",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientProfiles_FileId",
                table: "PatientProfiles",
                column: "FileId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientProfiles_PatientId",
                table: "PatientProfiles",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PharmacyProfiles_PharmacistId",
                table: "PharmacyProfiles",
                column: "PharmacistId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationInvoices_HealthPlanId",
                table: "RegistrationInvoices",
                column: "HealthPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationInvoices_PatientId",
                table: "RegistrationInvoices",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceInvoices_PatientId",
                table: "ServiceInvoices",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequestResultImages_ServiceRequestResultId",
                table: "ServiceRequestResultImages",
                column: "ServiceRequestResultId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequestResults_ServiceRequestId",
                table: "ServiceRequestResults",
                column: "ServiceRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_AppointmentId",
                table: "ServiceRequests",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_ConsultationId",
                table: "ServiceRequests",
                column: "ConsultationId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_ServiceId",
                table: "ServiceRequests",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_ServiceInvoiceId",
                table: "ServiceRequests",
                column: "ServiceInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_ServiceCategoryId",
                table: "Services",
                column: "ServiceCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Surgeries_AppointmentId",
                table: "Surgeries",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Surgeries_ConsultationId",
                table: "Surgeries",
                column: "ConsultationId");

            migrationBuilder.CreateIndex(
                name: "IX_Surgeries_DoctorId",
                table: "Surgeries",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Surgeries_InitiatorId",
                table: "Surgeries",
                column: "InitiatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Surgeries_PatientId",
                table: "Surgeries",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_BenefactorAccountId",
                table: "Transactions",
                column: "BenefactorAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_BenefactorAdmissionId",
                table: "Transactions",
                column: "BenefactorAdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_BenefactorId",
                table: "Transactions",
                column: "BenefactorId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_InitiatorId",
                table: "Transactions",
                column: "InitiatorId");

            migrationBuilder.CreateIndex(
                name: "IX_WardPersonnelProfiles_WardPersonnelId",
                table: "WardPersonnelProfiles",
                column: "WardPersonnelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountantProfiles");

            migrationBuilder.DropTable(
                name: "AccountInvoices");

            migrationBuilder.DropTable(
                name: "AdminProfiles");

            migrationBuilder.DropTable(
                name: "AdmissionDrugDispensings");

            migrationBuilder.DropTable(
                name: "AdmissionDrugMedications");

            migrationBuilder.DropTable(
                name: "AdmissionNotes");

            migrationBuilder.DropTable(
                name: "AdmissionPrescriptions");

            migrationBuilder.DropTable(
                name: "AdmissionServiceMedications");

            migrationBuilder.DropTable(
                name: "AdmissionServiceRequestResultImages");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "DoctorEducations");

            migrationBuilder.DropTable(
                name: "DoctorExperiences");

            migrationBuilder.DropTable(
                name: "DoctorOfficeTimes");

            migrationBuilder.DropTable(
                name: "DoctorSocials");

            migrationBuilder.DropTable(
                name: "DoctorSpecializations");

            migrationBuilder.DropTable(
                name: "DrugBatches");

            migrationBuilder.DropTable(
                name: "DrugDispensings");

            migrationBuilder.DropTable(
                name: "DrugPrices");

            migrationBuilder.DropTable(
                name: "HMOAdminProfiles");

            migrationBuilder.DropTable(
                name: "HMOHealthPlanDrugPrices");

            migrationBuilder.DropTable(
                name: "HMOHealthPlanPatients");

            migrationBuilder.DropTable(
                name: "HMOHealthPlanServicePrices");

            migrationBuilder.DropTable(
                name: "HMOSubUserGroupPatients");

            migrationBuilder.DropTable(
                name: "LabProfiles");

            migrationBuilder.DropTable(
                name: "MyPatients");

            migrationBuilder.DropTable(
                name: "NHISHealthPlanDrugs");

            migrationBuilder.DropTable(
                name: "NHISHealthPlanPatients");

            migrationBuilder.DropTable(
                name: "NHISHealthPlanServices");

            migrationBuilder.DropTable(
                name: "NurseProfiles");

            migrationBuilder.DropTable(
                name: "ObservationCharts");

            migrationBuilder.DropTable(
                name: "PatientPreConsultation");

            migrationBuilder.DropTable(
                name: "PatientProfiles");

            migrationBuilder.DropTable(
                name: "PharmacyProfiles");

            migrationBuilder.DropTable(
                name: "RegistrationInvoices");

            migrationBuilder.DropTable(
                name: "ServiceRequestResultImages");

            migrationBuilder.DropTable(
                name: "Surgeries");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "WardPersonnelProfiles");

            migrationBuilder.DropTable(
                name: "AdmissionServiceRequestResults");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "DoctorProfiles");

            migrationBuilder.DropTable(
                name: "DrugDispensingInvoices");

            migrationBuilder.DropTable(
                name: "HMOSubUserGroups");

            migrationBuilder.DropTable(
                name: "Drugs");

            migrationBuilder.DropTable(
                name: "NHISHealthPlans");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "ServiceRequestResults");

            migrationBuilder.DropTable(
                name: "AdmissionServiceRequests");

            migrationBuilder.DropTable(
                name: "DoctorClerkings");

            migrationBuilder.DropTable(
                name: "HMOHealthPlans");

            migrationBuilder.DropTable(
                name: "HMOUserGroups");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "ServiceRequests");

            migrationBuilder.DropTable(
                name: "AdmissionInvoices");

            migrationBuilder.DropTable(
                name: "HMOs");

            migrationBuilder.DropTable(
                name: "DoctorAppointments");

            migrationBuilder.DropTable(
                name: "Consultations");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "ServiceInvoices");

            migrationBuilder.DropTable(
                name: "Admissions");

            migrationBuilder.DropTable(
                name: "HealthPlans");

            migrationBuilder.DropTable(
                name: "ServiceCategories");

            migrationBuilder.DropTable(
                name: "Beds");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Wards");
        }
    }
}
