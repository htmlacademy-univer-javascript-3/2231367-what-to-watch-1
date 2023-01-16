import {Film} from '../../types/film';
import {useState} from 'react';
import {Tab} from '../../consts';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';

type TabsProps = {
  film: Film,
};

function Tabs(props: TabsProps): JSX.Element {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Overview);
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${currentTab === Tab.Overview && 'film-nav__item--active'}`}>
            <a href="#overviews" className="film-nav__link" data-testid='overview-tab' onClick={
              (evt) => {
                evt.preventDefault();
                setCurrentTab(Tab.Overview);
              }
            }
            >
              {Tab.Overview}
            </a>
          </li>
          <li className={`film-nav__item ${currentTab === Tab.Details && 'film-nav__item--active'}`}>
            <a href="#details" className="film-nav__link" data-testid='details-tab' onClick={
              (evt) => {
                evt.preventDefault();
                setCurrentTab(Tab.Details);
              }
            }
            >
              {Tab.Details}
            </a>
          </li>
          <li className={`film-nav__item ${currentTab === Tab.Reviews && 'film-nav__item--active'}`}>
            <a href="#reviews" className="film-nav__link" data-testid='reviews-tab' onClick={
              (evt) => {
                evt.preventDefault();
                setCurrentTab(Tab.Reviews);
              }
            }
            >
              {Tab.Reviews}
            </a>
          </li>
        </ul>
      </nav>
      {currentTab === Tab.Overview && <OverviewTab film={props.film} />}
      {currentTab === Tab.Details && <DetailsTab film={props.film} />}
      {currentTab === Tab.Reviews && <ReviewsTab />}
    </div>
  );
}

export default Tabs;
