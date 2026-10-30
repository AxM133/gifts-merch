import { sizeChart } from '../model/sizeChart'

export function SizeChartTable() {
  return (
    <div className="rounded-lg bg-white p-4 text-[#333]">
      <h4 className="text-[1rem] font-semibold uppercase">Таблица размеров</h4>
      <div className="mt-1 mb-3 h-0.5 w-12 bg-[#c0425b]" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[26rem] text-center text-[0.7rem]">
          <thead>
            <tr className="bg-[#f1f1f1]">
              <th scope="col" className="px-3 py-2 text-left font-medium text-[#777]">
                A / B, см
              </th>
              {sizeChart.map((row) => (
                <th key={row.size} scope="col" className="px-2 py-2 font-semibold">
                  {row.size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="bg-[#f1f1f1] px-3 py-3 text-left font-normal text-[#777]">
                Длина / Ширина
              </th>
              {sizeChart.map((row) => (
                <td key={row.size} className="px-2 py-3 text-[#555]">
                  {row.value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
