interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  return (
    <div key={category} className="category">
      <span>{category}</span>
      <div className="category-image">
        <img src={`../../../assets/categories/${category}.png`} alt={category} />
      </div>
    </div>
  );
}
