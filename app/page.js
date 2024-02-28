import SearchWrapper from '@/blocks/SearchWrapper'
import Search from '@/components/Search'

export default function App() {
  return (
    <main>

      <SearchWrapper>
        <Search

          results={50}
          heap={0}
          algorithm={13} // 13 is RR + Coverage, 0 is pure RelevancyRanking
          doTruncate={true}

          />
      </SearchWrapper>

    </main>
  )
}