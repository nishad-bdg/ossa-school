import React, { Component }from 'react'
import TableHeading from '../../EstimationPage/CustomComponent/TableHeading'
import AccomodationItem from './AccomodationItem'
class SectionAccomodation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  const { publicData, intl, listingSchool } = this.props;
  return (
  <>
  <TableHeading>{intl.formatMessage({ id: 'SectionAccomodation.title' })}</TableHeading> 
    {
      publicData?.accommodations?.map((data, index) => (<AccomodationItem key={index} intl={intl} listingSchool={listingSchool} accomodation={JSON.parse(data.accomodation)}/>))
    }
    </>
  )
}
}

export default SectionAccomodation