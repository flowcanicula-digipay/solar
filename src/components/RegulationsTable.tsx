import { useTranslations } from 'next-intl';

const rowKeys = ['row1', 'row2', 'row3'] as const;

export default function RegulationsTable() {
  const t = useTranslations('regulations.s4');

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-800/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-navy-950 text-cream-50">
          <tr>
            <th className="px-4 py-3 font-semibold font-mono">{t('headers.capacity')}</th>
            <th className="px-4 py-3 font-semibold">{t('headers.who')}</th>
            <th className="px-4 py-3 font-semibold">{t('headers.process')}</th>
          </tr>
        </thead>
        <tbody>
          {rowKeys.map((key) => (
            <tr key={key} className="border-t border-navy-800/10">
              <td className="px-4 py-3 font-mono">{t(`${key}.range`)}</td>
              <td className="px-4 py-3">{t(`${key}.who`)}</td>
              <td className="px-4 py-3 text-charcoal/70">{t(`${key}.process`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
