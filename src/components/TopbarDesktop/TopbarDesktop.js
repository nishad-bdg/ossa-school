import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import {
  Avatar,
  InlineTextButton,
  Logo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import css from './TopbarDesktop.module.css';
import btnIcon from "../../containers/LandingPage/image/img/btn-icon.svg";

const TopbarDesktop = props => {
  const {
    className,
    currentUser,
    currentPage,
    rootClassName,
    currentUserHasListings,
    notificationCount,
    intl,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues,
  } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  const classes = classNames(rootClassName || css.root, className);

  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

  const inboxLink = authenticatedOnClientSide ? (
    <NamedLink
      className={css.inboxLink}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <span className={css.inbox}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  ) : null;

  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  const profileMenu = authenticatedOnClientSide ? (
    <Menu>
      <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
        {/* <span>{currentUser?.attributes?.email}</span> */}
        {" "}<Avatar className={css.avatar} user={currentUser} disableProfileLink />
      </MenuLabel>
      <MenuContent className={css.profileMenuContent}>
        <MenuItem key="ManageListingsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('InboxBasePage'))}
            name="InboxBasePage"
          >
            {/*<span className={css.menuItemBorder} />*/}
            <FormattedMessage id="TopbarDesktop.inbox" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="ProfileSettingsPage">
          <NamedLink
            className={classNames(css.profileSettingsLink, currentPageClass('ProfileSettingsPage'))}
            name="ProfileSettingsPage"
          >
            {/*<span className={css.menuItemBorder} />*/}
            <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
          </NamedLink>
        </MenuItem>
        {/*<MenuItem key="AccountSettingsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
            name="AccountSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
          </NamedLink>
        </MenuItem>*/}
        <MenuItem key="logout">
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            {/*<span className={css.menuItemBorder} />*/}
            <FormattedMessage id="TopbarDesktop.logout" />
          </InlineTextButton>
        </MenuItem>
      </MenuContent>
    </Menu>
  ) : null;

  const signupLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="SignupPage" className={css.signupLink}>
      <button className={'mt-3 btn btn-light shadow-sm py-2 px-3 bg-body rounded'}>
        <FormattedMessage id="TopbarDesktop.signup" />
      </button>
    </NamedLink>
  );

  const loginLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="LoginPage" className={'menu-btn'}>
      <button>
        ログイン・新規会員登録 <img className='menu-icon-btn' src={btnIcon} alt="menu icon" />
      </button>
    </NamedLink>
  );
  
  let isNonSchoolUser = true;
  isNonSchoolUser =
      currentUser && typeof currentUser.attributes != 'undefined' && currentUser.attributes.profile.publicData.type !== 'school'
        ? true
        : false;

		console.log(currentUser)
  return (
    <nav className={classes}>
      <NamedLink className={css.logoLink} name="LandingPage">
        <Logo
          format="desktop"
          className={css.logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink>
      {/*{search}*/}
      <div className="align">
        {!isAuthenticated ?
          <>
            <NamedLink className={css.createListingLink} name="AboutUsPage">
              <span className={css.createListing}>
                <span className={css.singleLine}>About</span>
                <span className={css.singleLineBottom}>Warpleについて</span>
              </span>
            </NamedLink>
            {loginLink}
          </>
          :
          <>
		    {
			(!isNonSchoolUser)?(
				<NamedLink className={css.createListingLink} name="NewListingPage">
				  <span className={css.singleLineAlignment}>
					<span className={css.singleLineBottomSub}>+ Add course</span>
				  </span>
				</NamedLink>
				):('')
			}
			{
			(!isNonSchoolUser)?(
				<NamedLink className={css.createListingLink} name="NewAccomodationPage">
				  <span className={css.singleLineAlignment}>
					<span className={css.singleLineBottomSub}>+ Add accomodations</span>
				  </span>
				</NamedLink>
				):('')
			}
			{
				(isNonSchoolUser)?(
				<NamedLink className={css.createListingLink} name="AboutUsPage">
				  <span className={css.createListing}>
					<span className={css.singleLine}>About</span>
					<span className={css.singleLineBottom}>Warpleについて</span>
				  </span>
				</NamedLink>
				):('')
			}
            {profileMenu}
			{
			    (isNonSchoolUser)?(
				<span className={css.singleLineAlignment}>
					<span className={css.singleLineBottomSub}>{intl.formatMessage({ id: 'TopbarDesktop.userEntry' })}</span>
				</span>
				):('')
			}
          </>
      }
      </div>
      {/*<NamedLink className={css.createListingLink} name="NewListingPage">
        <span className={css.createListing}>
          <FormattedMessage id="TopbarDesktop.createListing" />
        </span>
      </NamedLink>
      <NamedLink className={css.createListingLink} name="NewAccomodationPage">
        <span className={css.createListing}>
          <FormattedMessage id="TopbarDesktop.createAccomodation" />
        </span>
      </NamedLink>*/}
    </nav>
  );
};

const { bool, func, object, number, string } = PropTypes;

TopbarDesktop.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  currentPage: null,
  notificationCount: 0,
  initialSearchFormValues: {},
};

TopbarDesktop.propTypes = {
  rootClassName: string,
  className: string,
  currentUserHasListings: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentPage: string,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  notificationCount: number,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};

export default TopbarDesktop;
