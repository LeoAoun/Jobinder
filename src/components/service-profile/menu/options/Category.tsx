interface CategoryProps {
  category: string;
  categoryChosen: string | null;
  onChooseCategory: (category: string) => void;
}

export default function Category({ category, categoryChosen, onChooseCategory }: CategoryProps) {
  return (
    <div key={category} className="category" onClick={() => onChooseCategory(category)}>
      <span style={{ color: categoryChosen === category ? "var(--lightGreen)" : "" }}>
        {category}
      </span>
      <div className={`category-image ${categoryChosen === category ? "category-active" : ""}`}>
        <img src={`../../../assets/categories/${category}.png`} alt={category} />
      </div>
    </div>
  );
}
