export default function Card({ width = "64", height = "40", children, property }) {
  return (
    <div
      className={`justify-center px-5 py-5 ${property}
         bg-green-200 rounded-lg shadow-2xl overflow-hidden align-middle`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
    >
      {children}
    </div>
  );
}