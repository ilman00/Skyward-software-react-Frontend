interface Props {
  title: string;
  value: number | string;
}

const KPIcard = ({ title, value }: Props) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
};

export default KPIcard;