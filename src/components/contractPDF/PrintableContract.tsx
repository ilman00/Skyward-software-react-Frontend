import React from "react";

interface LeaseAgreementProps {
    data: {
        date: string;
        name: string;
        fatherName: string;
        cnic: string;
        mobileNumber: string;
        screenPercentage: string;
        screenNumber: string;
        agreementYears: string;
        rentPerScreen: string;
        totalRent: string;
    };
}

const LeaseAgreement: React.FC<LeaseAgreementProps> = ({ data }) => {
    const {
        date,
        name,
        fatherName,
        cnic,
        mobileNumber,
        screenPercentage,
        screenNumber,
        agreementYears,
        rentPerScreen,
        totalRent,
    } = data;

    return (
        <div className="print-wrapper">
            <div className="a4-page" dir="rtl">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div className="text-lg">{date}</div>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold border-b-2 border-black inline-block pb-2">
                        معاہدہ بابت عقد اجارہ
                    </h1>
                </div>

                {/* Parties Section */}
                <div className="space-y-4 text-[18px] leading-9">
                    <p>
                        <strong>فریق اول:</strong> سکائی ورڈ وژن پرائیویٹ لمیٹڈ (پشاور مال،
                        نزد حیات آباد ٹول پلازہ رنگ روڈ، پشاور)
                    </p>

                    <p>
                        کمپنی رجسٹریشن نمبر: 0307079 — Security & Exchange Commission of
                        Pakistan
                    </p>

                    <hr className="my-6" />

                    <p>
                        <strong>فریق دوئم:</strong> {name} ولد {fatherName}
                    </p>
                    <p>
                        <strong>شناختی کارڈ نمبر:</strong> {cnic}
                    </p>
                    <p>
                        <strong>موبائل نمبر:</strong> {mobileNumber}
                    </p>
                </div>

                {/* Clauses */}
                <div className="mt-10 space-y-6 text-[18px] leading-10 text-justify">
                    <p>
                        <strong>شق اول:</strong> فریق دوئم نے اپنی {screenPercentage} سکرین
                        جس کا سیریل نمبر {screenNumber} ہے، فریق اول کو {agreementYears} سال
                        کے لئے بطور اجارہ استعمال کے لئے فراہم کر دی۔
                    </p>

                    <p>
                        <strong>شق دوئم:</strong> فریق اول {agreementYears} سال تک مسلسل
                        ماہانہ اجرت فی سکرین {rentPerScreen} روپے کے حساب سے مجموعی طور پر{" "}
                        {totalRent} روپے فریق دوئم کو ادا کرنے کا پابند ہوگا۔
                    </p>

                    <p>
                        <strong>شق سوئم:</strong> فریق اول مدت معاہدہ کے دوران سکرین کی
                        حفاظت کی مکمل ذمہ داری لے گا۔ بجلی بل اور حکومتی ٹیکسز فریق اول کے
                        ذمہ ہوں گے۔
                    </p>

                    <p>
                        <strong>شق چہارم:</strong> دونوں فریقین اس معاہدے کی مکمل پاسداری
                        کریں گے۔
                    </p>

                    <p>
                        <strong>شق پنجم:</strong> مدت {agreementYears} سال مکمل ہونے پر
                        فریقین کی باہمی رضامندی سے معاہدہ منسوخ یا تجدید کیا جا سکے گا۔
                    </p>

                    <p>
                        <strong>شق ششم:</strong> معاہدے کی تنسیخ کی صورت میں فریق اول کمپنی
                        پالیسی کے مطابق فریق دوم سے سکرین خریدنے کا پابند ہوگا۔
                    </p>

                    <p>
                        <strong>شق ہفتم:</strong> تجدید کی صورت میں فریقین باہمی رضامندی سے
                        نئی مدت اور اجرت کا تعین کریں گے۔
                    </p>

                    <p>
                        <strong>شق ہشتم:</strong> یہ معاہدہ فریقین کی باہمی رضامندی سے تحریر
                        کیا گیا ہے اور اس کی خلاف ورزی کی صورت میں کمپنی کے قواعد و ضوابط کے
                        مطابق کارروائی کی جائے گی۔
                    </p>
                </div>

                {/* Signature Section */}
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
                            دستخط فریق دوئم
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
};

export default LeaseAgreement;