import { CategoryTile } from '@/entities/category'
import { Container, Reveal } from '@/shared/ui'
import { useCategoryTiles } from '../model/useCategoryTiles'

export function CategoryGrid({ title, subtitle }) {
  const tiles = useCategoryTiles()
  return (
    <section className="pt-2 pb-8 lg:pb-[4rem]" aria-labelledby="category-grid-title">
      <Container>
        <Reveal>
          <h2 id="category-grid-title" className="text-[2rem] font-semibold lg:text-[2.7rem]">
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-[0.85rem] text-body">{subtitle}</p>}
        </Reveal>
        <ul className="mt-9 grid grid-cols-2 gap-x-[1.2rem] gap-y-[2rem] lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <Reveal as="li" key={tile.id} delay={(i % 4) * 90}>
              <CategoryTile to={tile.to} label={tile.label} image={tile.image} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
