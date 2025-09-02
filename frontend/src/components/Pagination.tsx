type PaginationProps = {
  page: number;
  lastPage: number;
  setPage: (page: number | ((prev: number) => number)) => void;
}

export const Pagination = ({ page, lastPage, setPage }: PaginationProps) => {
  return (
      <div className='flex gap-8 justify-center mt-5'>
        <button
          type='button'
          className={page <= 1 ? 'text-gray-700' : 'text-white'}
          disabled={page <= 1}
          onClick={() => setPage(1)}
        >
          {'<<'}
        </button>
        <button
          type='button'
          className={page <= 1 ? 'text-gray-700' : 'text-white'}
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          {'Prev <'}
        </button>
        <span className='text-white'>Page {page}</span>
        <button
          type='button'
          className={page >= lastPage ? 'text-gray-700' : 'text-white'}
          disabled={page >= lastPage}
          onClick={() => setPage(prev => Math.min(prev + 1, lastPage))}
        >
          {'> Next'}
        </button>
        <button
          className={page >= lastPage ? 'text-gray-700' : 'text-white'}
          disabled={page >= lastPage}
          onClick={() => setPage(lastPage)}
        >
          {'>>'}
        </button>
      </div>
  )
}