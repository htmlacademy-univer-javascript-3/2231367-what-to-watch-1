type FilmCardProps = {
  src: string,
  alt: string,
  href: string,
  name: string
}

function FilmCard(props: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.src}
             alt={props.alt}/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={props.href}>{props.name}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
