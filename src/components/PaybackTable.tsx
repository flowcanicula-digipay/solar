import { useTranslations } from 'next-intl';

const rows = [
  { size: '5 kWp', savings: '~1,400,000 VND', cost: '~78,000,000 VND', payback: '~4.6 years' },
  { size: '8 kWp', savings: '~2,200,000 VND', cost: '~125,000,000 VND', payback: '~4.7 years' },
  { size: '15 kWp', savings: '~4,800,000 VND', cost: '~230,000,000 VND', payback: '~4.0 years' },
];

export default function PaybackTable() {
  const t = useTranslations('pricing.payback.table');

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-800/10">
      <table className="w-full text-left text-sm font-mono">
        <thead className="bg-navy-950 text-cream-50">
          <tr>
            <th className="px-4 py-3 font-semibold">{t('system')}</th>
            <th className="px-4 py-3 font-semibold">{t('savings')}</th>
            <th className="px-4 py-3 font-semibold">{t('cost')}</th>
            <th className="px-4 py-3 font-semibold">{t('payback')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.size} className="border-t border-navy-800/10">
              <td className="px-4 py-3">{row.size}</td>
              <td className="px-4 py-3">
                {row.savings}
                {t('perMonth')}
              </td>
              <td className="px-4 py-3">{row.cost}</td>
              <td className="px-4 py-3">{row.payback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
