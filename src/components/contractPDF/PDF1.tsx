import dayjs from "dayjs";

interface ContractProps {
  data: {
    customerName: string;
    fatherName: string;
    cnic: string;
    mobile: string;
    amount: number;
    serialNumber: string;
    date: string;
    companyName?: string;
    companyAddress?: string;
  };
}

export default function OwnershipContract({ data }: ContractProps) {
  return (
    <div className="print-wrapper">
      <div className="a4-page" dir="rtl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold border-b-2 border-black inline-block pb-2">
            اونر شپ سرٹیفکیٹ
          </h1>

          <p className="mt-4 text-lg font-semibold">
            {data.companyName || "سکائی ورڈ وژن پرائیویٹ لمیٹڈ"}
          </p>

          <p className="text-sm mt-1">
            {data.companyAddress ||
              "پشاور روڈ، رنگ پلازہ ٹول پلازہ حیات آباد"}
          </p>
        </div>

        {/* Parties Section */}
        <div className="space-y-4 text-[18px] leading-10">
          <p>
            <strong>فریق اول:</strong> کمپنی
          </p>

          <p>
            <strong>فریق دوم:</strong> {data.customerName} ولد{" "}
            {data.fatherName}
          </p>

          <p>
            <strong>شناختی کارڈ نمبر:</strong> {data.cnic}
          </p>

          <p>
            <strong>موبائل نمبر:</strong> {data.mobile}
          </p>
        </div>

        {/* Clauses */}
        <div className="mt-10 space-y-6 text-[18px] leading-10 text-justify">
          <p>
            <strong>شق اول:</strong> فریق دوم نے کمپنی سے ایک عدد ڈیجیٹل سکرین
            خریدی۔
          </p>

          <p>
            <strong>شق دوئم:</strong> فریق دوم اس سکرین کا مکمل اور قانونی مالک
            ہوگا۔
          </p>

          <p>
            <strong>شق سوئم:</strong> سکرین کی قیمت مبلغ{" "}
            {data.amount.toLocaleString()} روپے وصول کر لی گئی۔
          </p>

          <p>
            <strong>شق چہارم:</strong> سکرین فریق دوم کے قبضہ میں دے دی گئی۔
          </p>

          <p>
            <strong>شق پنجم:</strong> یہ معاہدہ فریقین کی باہمی رضامندی سے طے
            پایا۔
          </p>
        </div>

        {/* Details Section */}
        <div className="mt-12 space-y-4 text-[18px] leading-9">
          <p>
            <strong>سکرین سیریل نمبر:</strong> {data.serialNumber}
          </p>

          <p>
            <strong>کل قیمت:</strong> {data.amount.toLocaleString()} روپے
          </p>

          <p>
            <strong>تاریخ:</strong>{" "}
            {dayjs(data.date).format("DD/MM/YYYY")}
          </p>
        </div>

        {/* Signatures */}
        <div className="mt-24 grid grid-cols-2 gap-16 text-center text-lg">
          <div className="space-y-20">
            <div className="border-t border-black pt-3 font-semibold">
              دستخط فریق اول
            </div>
            <div className="border-t border-black pt-3 font-semibold">
              دستخط گواہ (۱)
            </div>
          </div>

          <div className="space-y-20">
            <div className="border-t border-black pt-3 font-semibold">
              دستخط فریق دوم
            </div>
            <div className="border-t border-black pt-3 font-semibold">
              دستخط گواہ (۲)
            </div>
          </div>
        </div>

        {/* Stamp */}
        <div className="mt-16 flex justify-center">
          <div className="border-2 border-dashed border-gray-400 px-16 py-8 text-gray-500 font-semibold">
            کمپنی اسٹیمپ
          </div>
        </div>
      </div>
    </div>
  );
}