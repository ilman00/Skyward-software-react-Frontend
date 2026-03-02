import OwnershipContract from "../../components/contractPDF/PDF1";
import PrintableContracts from "../../components/contractPDF/PrintableContract";
import PDF3 from "../../components/contractPDF/PDF3";


export default function PDFPage() {
  const contractData = {
    companyName: "سکائی ورڈ وژن پرائیویٹ لمیٹڈ",
    companyAddress: "پشاور روڈ، رنگ پلازہ ٹول پلازہ حیات آباد",
    customerName: "Ali Ahmad",
    fatherName: "احمد خان",
    cnic: "12345-6789012-3",
    mobile: "0300-1234567",
    amount: 50000,
    serialNumber: "SN-00123",
    date: "2025-09-12",
  };

  const myData = {
  date: "2/10/2026",
  name: "علی خان",
  fatherName: "احمد خان",
  cnic: "12345-6789012-3",
  mobileNumber: "0300-1234567",
  screenPercentage: "half 1/2",
  screenNumber: "65-SN",
  agreementYears: "102",
  rentPerScreen: "5000",
  totalRent: "5000"
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 paragraph-margin">
      <OwnershipContract data={contractData} />
      <PrintableContracts data={myData} />
      <PDF3 data={myData} />
    </div>
  );
}

//