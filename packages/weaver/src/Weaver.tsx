import { useSystem } from "./useSystem";

export const Weaver: React.FC = () => {
  useSystem()
  return (
    <div className="grid h-screen" style={{ gridTemplateColumns: 'clamp(100px,25%,250px) 1fr' }}>
      <aside className="grid" style={{ gridTemplateRows: 'auto 1fr auto' }}>
        <header>
          <input type="search" placeholder="搜索" />
        </header>
        <div>List</div>
        <footer>Fotter</footer>
      </aside>
      <main>Main</main>
    </div>
  );
};
