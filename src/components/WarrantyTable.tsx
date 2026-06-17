import { useTranslations } from 'next-intl';

export default function WarrantyTable() {
  const t = useTranslations('home.warranty');
  const rows = ['row1', 'row2', 'row3', 'row4', 'row5'] as const;

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-800/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-navy-950 text-cream-50">
          <tr>
            <th className="px-4 py-3 font-semibold">{t('headers.component')}</th>
            <th className="px-4 py-3 font-semibold">{t('headers.provider')}</th>
            <th className="px-4 py-3 font-mono font-semibold">{t('headers.duration')}</th>
            <th className="px-4 py-3 font-semibold">{t('headers.coverage')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-t border-navy-800/10">
              <td className="px-4 py-3 font-medium text-navy-950">{t(`${row}.component`)}</td>
              <td className="px-4 py-3 text-charcoal/70">{t(`${row}.provider`)}</td>
              <td className="px-4 py-3 font-mono text-charcoal/70">{t(`${row}.duration`)}</td>
              <td className="px-4 py-3 text-charcoal/70">{t(`${row}.coverage`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
