import {FimlType} from "../../types/FilmType";
import FilmCard from "../film-card/film-card";
import {Fragment} from "react";

type FilmListProps = {
  filmList: FimlType[]
}

function FilmList(props: FilmListProps) {
  const list = [];
  for (const film of props.filmList) {
    list.push(
      <FilmCard
        film={film}
      />
    );
  }
  return (
    <Fragment>
      {list}
    </Fragment>
  );
}

export default FilmList;
