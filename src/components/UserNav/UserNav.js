import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { LinkTabNavHorizontal } from '../../components';
import { compose } from 'redux';
import { connect } from 'react-redux';

import css from './UserNav.module.css';

const UserNavSection = props => {
  const { currentUser, className, rootClassName, selectedPageName } = props;
  const classes = classNames(rootClassName || css.root, className);

  const tabs = [
    {
      text: <FormattedMessage id="SchoolPhotoPage.title" />,
      selected: selectedPageName === 'SchoolPhotoPage',
      linkProps: {
        name: 'SchoolPhotoPage',
      },
    },
    {
      text: <FormattedMessage id="CoursePage.title" />,
      selected: selectedPageName === 'ManageListingsPage',
      linkProps: {
        name: 'ManageListingsPage',
      },
    },
    {
      text: <FormattedMessage id="AccomodationsPage.title" />,
      selected: selectedPageName === 'AccomodationPage',
      linkProps: {
        name: 'AccomodationPage',
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.fixedCost" />,
      selected: selectedPageName === 'FixedCostSettingsPage',
      linkProps: {
        name: 'FixedCostSettingsPage'
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.options" />,
      selected: selectedPageName === 'OptionsSettingsPage',
      linkProps: {
        name: 'OptionsSettingsPage'
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.tag" />,
      selected: selectedPageName === 'TagSettingsPage',
      linkProps: {
        name: 'TagSettingsPage'
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.profileSettings" />,
      selected: selectedPageName === 'ProfileSettingsPage',
      disabled: false,
      linkProps: {
        name: 'ProfileSettingsPage',
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.accountSettings" />,
      selected: ACCOUNT_SETTINGS_PAGES.includes(selectedPageName),
      disabled: false,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
  ];
  
  const isUserNavShow =
      currentUser && typeof currentUser.attributes != 'undefined' && currentUser.attributes.profile.publicData.type === 'school'
        ? true
        : false;
 
  if(isUserNavShow){
	    return (
			<LinkTabNavHorizontal className={classes} tabRootClassName={css.tab} tabs={tabs} skin="dark" />
		  );
  }else{
	  return ('');
  }
};



const mapStateToProps = state => {
  const { currentUser } = state.user;
  return {
    currentUser,
  };
};

const UserNav = compose(
  connect(mapStateToProps),
)(UserNavSection);

export default UserNav;
