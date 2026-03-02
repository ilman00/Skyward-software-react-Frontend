import React from "react";

interface BuybackPolicyProps {
    data: {
        date: string;
    };
}

const BuybackPolicy: React.FC<BuybackPolicyProps> = ({ data }) => {
    return (
        <div className="print-wrapper">
            <div className="a4-page" dir="rtl">
                {/* Date */}
                <div className="flex justify-between items-center mb-12">
                    <div className="text-lg">{data.date}</div>
                </div>

                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold border-b-2 border-black inline-block pb-2">
                        سکرین کی واپسی / بائی بیک پالیسی
                    </h1>
                </div>

                {/* Main Content */}
                <div className="space-y-6 text-[18px] leading-10 text-justify">
                    <p>
                        جب معاہدہ کی مدت، جو کہ کنٹریکٹ میں درج ہے، مکمل ہو جائے تو درج ذیل
                        شرائط و ضوابط لاگو ہوں گے:
                    </p>

                    <p>
                        <strong>شق اول:</strong> کسٹمر کو مکمل اختیار ہوگا کہ وہ اپنی سکرین
                        اپنے پاس رکھے یا مارکیٹ میں فروخت کرے۔ کمپنی معاہدہ کے اختتام تک کرایہ
                        ادا کرنے کی پابند ہوگی۔
                    </p>

                    <p>
                        <strong>شق دوئم:</strong> کمپنی بطور ثالث کسٹمر کے لئے مارکیٹ میں
                        خریدار تلاش کرنے میں معاونت کر سکتی ہے، تاہم فروخت کی مکمل ذمہ داری
                        کسٹمر پر ہوگی۔
                    </p>

                    <p>
                        <strong>شق سوئم:</strong> اگر کسٹمر خود خریدار تلاش کرنے میں ناکام
                        رہے تو وہ کمپنی کو سکرین واپس خریدنے کی پیشکش کر سکتا ہے۔
                    </p>

                    <p>
                        <strong>شق چہارم:</strong> یہ پیشکش کسی بھی دباؤ یا زبردستی کے بغیر
                        دونوں فریقین کی باہمی رضامندی سے ہوگی۔
                    </p>

                    <p>
                        <strong>شق پنجم:</strong> کمپنی سکرین کو کم از کم اسی قیمت پر خریدنے
                        کی پابند ہوگی جس قیمت پر سکرین ابتدائی طور پر خریدی گئی تھی۔
                    </p>
                </div>

                {/* During Agreement Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold border-b border-black inline-block pb-2 mb-8">
                        دورانِ معاہدہ سکرین کی واپسی
                    </h2>

                    <div className="space-y-6 text-[18px] leading-10 text-justify">
                        <p>
                            چونکہ یہ معاہدہ دونوں فریقین کی باہمی رضامندی سے طے پاتا ہے، لہٰذا
                            دورانِ معاہدہ فریق اول سکرین واپس کرنے کا مطالبہ نہیں کر سکتا اور
                            نہ ہی فریق دوئم رقم کی واپسی کا تقاضا کر سکتا ہے۔
                        </p>

                        <p>
                            تاہم اگر کسی خاص مجبوری کی صورت پیش آئے تو باہمی رضامندی سے درج
                            ذیل شرائط کے تحت واپسی ممکن ہوگی:
                        </p>

                        <p>
                            <strong>۱۔</strong> معاہدہ کی مدت کم از کم 6 ماہ مکمل ہو چکی ہو۔
                        </p>

                        <p>
                            <strong>۲۔</strong> 6 ماہ سے پہلے واپسی کا مطالبہ قابل قبول نہیں
                            ہوگا۔
                        </p>

                        <p>
                            <strong>۳۔</strong> کسٹمر کم از کم 15 دن قبل تحریری اطلاع دے گا۔
                        </p>

                        <p>
                            <strong>۴۔</strong> اس مدت کے دوران کمپنی متبادل خریدار تلاش کرنے
                            کی کوشش کرے گی۔
                        </p>

                        <p>
                            <strong>۵۔</strong> اگر کمپنی خریدار تلاش کرنے میں ناکام رہے تو
                            کسٹمر کمپنی پر کسی قسم کا دباؤ نہیں ڈال سکے گا۔
                        </p>
                    </div>
                </div>

                {/* Note Section */}
                <div className="mt-16 border-t pt-8">
                    <div
                        className="p-6 border border-gray-400 text-left text-sm leading-7"
                        dir="ltr"
                    >
                        <h3 className="font-semibold mb-2">Note:</h3>
                        <p>
                            After the screen is rented, the company begins installation
                            planning and file preparation, which may take 3 to 7 business
                            days. Once the file is prepared, the rental period will officially
                            start.
                        </p>
                    </div>
                </div>

                {/* Signatures */}
                <div className="mt-24 grid grid-cols-2 gap-16 text-center text-lg">
                    <div className="space-y-20">
                        <div className="border-t border-black pt-3 font-semibold">
                            دستخط فریق اول
                        </div>
                    </div>

                    <div className="space-y-20">
                        <div className="border-t border-black pt-3 font-semibold">
                            دستخط فریق دوئم
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

export default BuybackPolicy;