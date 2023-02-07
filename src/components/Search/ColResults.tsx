import ColResult, { Result } from './ColResult';

export default function ColResults({ cols }: { cols: Result[] | undefined }) {
  return (
    <div className='mt-5 space-y-2'>
      <h5 className='font-bold text-lg'>{cols?.length} collections</h5>
      {cols?.length ? (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-3 xl:grid-cols-5'>
          {cols?.map((col) => (
            <article className='group rounded-2xl' key={col.collectionId}>
              <ColResult
                collectionId={col.collectionId}
                logoImgName={col.logoImgName}
                bannerImgName={col.bannerImgName}
                collectionName={col.collectionName}
              />
            </article>
          ))}
        </section>
      ) : (
        <p className='ml-3.5'>We couldn{"'"}t find any collections.</p>
      )}
    </div>
  );
}
