/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */


export const filters = [
  {
    id: 'dates',
    label: 'Dates',
    type: 'BookingDateRangeFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {},
  },
  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },
  {
    id: 'category',
    label: 'Category',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'smoke', label: 'Smoke' },
        { key: 'electric', label: 'Electric' },
        { key: 'wood', label: 'Wood' },
        { key: 'other', label: 'Other' },
      ],
    },
  },
  {
    id: 'howToMove',
    label: 'How To Move',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'walking', label: 'Walking' },
        { key: 'by_car', label: 'By car' },
        { key: 'by_bus', label: 'By bus' },
        { key: 'other', label: 'Other' },
      ],
    },
  },
  {
    id: 'howMuchTime',
    label: 'How Much Time',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: '5_mins', label: '5 mins' },
        { key: '10_mins', label: '10 mins' },
        { key: '15_mins', label: '15 mins' },
        { key: '20_mins', label: '20 mins' },
      ],
    },
  },
  {
    id: 'roomType',
    label: 'Room Type',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'single_room', label: 'Single room' },
        { key: 'double_room', label: 'Double room' }
      ],
    },
  },
  {
    id: 'broadType',
    label: 'Broad Type',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'breakfast_only', label: 'Breakfast only' },
        { key: 'launch_only', label: 'Launch only' },
        { key: 'dinner_only', label: 'Dinner only' }
      ],
    },
  },
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'towels',
          label: 'Towels',
        },
        {
          key: 'bathroom',
          label: 'Bathroom',
        },
        {
          key: 'swimming_pool',
          label: 'Swimming pool',
        },
        {
          key: 'own_drinks',
          label: 'Own drinks allowed',
        },
        {
          key: 'jacuzzi',
          label: 'Jacuzzi',
        },
        {
          key: 'audiovisual_entertainment',
          label: 'Audiovisual entertainment',
        },
        {
          key: 'barbeque',
          label: 'Barbeque',
        },
        {
          key: 'own_food_allowed',
          label: 'Own food allowed',
        },
      ],
    },
  },
  {
    id: 'studyabroad',
    label: 'Select the three you want to emphasize in particular.',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_studyabroad'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'short_term_study_abroad',
          label: 'Short term study abroad',
        },
        {
          key: 'long_term_study_abroad',
          label: 'Long term study abroad',
        },
        {
          key: 'working_holiday',
          label: 'Working Holiday',
        },
        {
          key: 'study_abroad_multiple_country',
          label: 'Study abroad multiple countries',
        },
        {
          key: 'student_with_children',
          label: 'Students with children',
        },
        {
          key: 'high_school_abroad_program',
          label: 'High school abroad program',
        },
        {
          key: 'credit_exchange_program',
          label: 'Credit exchange program',
        },
        {
          key: 'degree_abroad_program',
          label: 'Degree abroad program',
        },
        {
          key: 'graduate_degree_abroad_program',
          label: 'Graduate degree abroad program',
        },
        {
          key: 'study_abroad_for_seniors',
          label: 'Study abroad for seniors',
        },
        {
          key: 'internship_abroad',
          label: 'Internships abroad',
        },
        {
          key: 'volunteer_abroad',
          label: 'Volunteer abroad',
        },
        {
          key: 'tafe',
          label: 'TAFE'
        },
        {
          key: 'language_study_abroad_programs',
          label: 'Language study abroad programs'
        },
        {
          key: 'co_op',
          label: 'Co-op'
        }
      ]
    }
  },
  {
    id: 'programs_tags',
    label: 'Select the three you want to emphasize in particular.',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_programs_tags'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'business_english',
          label: 'Business english',
        },
        {
          key: 'celta',
          label: 'CELTA',
        },
        {
          key: 'tesol',
          label: 'TESOL',
        },
        {
          key: 'j_shine',
          label: 'J-shine',
        },
        {
          key: 'toeic_exam_preparation',
          label: 'TOEIC exam preparation',
        },
        {
          key: 'tofel_exam_preparation',
          label: 'TOFEL exam preparation',
        },
        {
          key: 'ielts_exam_preparation',
          label: 'IELTS exam preparation',
        },
        {
          key: 'working_holiday',
          label: 'Working Holiday',
        },
        {
          key: 'child_care',
          label: 'Child care',
        },
        {
          key: 'design',
          label: 'Design',
        },
        {
          key: 'hospitality_and_tourism',
          label: 'Hospitality and Tourism',
        },
        {
          key: 'programming',
          label: 'Programming',
        },
        {
          key: 'marketing',
          label: 'Marketing',
        },
        {
          key: 'barista',
          label: 'Barista',
        },
        {
          key: 'others',
          label: 'Others'
        }
      ]
    }
  },
  {
    id: 'features_tags',
    label: 'Select the three you want to emphasize in particular.',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_features_tags'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'japanese_available',
          label: 'Japanese Available',
        },
        {
          key: 'native_english_speaking_teacher',
          label: 'Native English-speaking teachers',
        },
        {
          key: 'there_are_few_japanese',
          label: 'There are few Japanese',
        },
        {
          key: 'focus_on_speaking',
          label: 'Focus on speaking',
        },
        {
          key: 'one_on_one_lessons',
          label: 'One-On-One lessons',
        },
        {
          key: 'english_pronunciation_lessons',
          label: 'English pronunciation lessons',
        },
        {
          key: '30_courses',
          label: '30+ course',
        },
        {
          key: '50_courses',
          label: '50+ course',
        },
        {
          key: 'school_activities',
          label: 'School activities',
        },
        {
          key: 'junior_school_affiliated',
          label: 'Junior school-affiliated',
        },
        {
          key: 'high_school_affiliated',
          label: 'High school-affiliated',
        },
        {
          key: 'university_affiliated',
          label: 'University-affiliated',
        },
        {
          key: 'comunity_college_affiliated',
          label: 'Community college-affiliated',
        },
        {
          key: 'english_only_policy',
          label: 'English Only Policy',
        },
        {
          key: 'nationality_mix_policy',
          label: 'National Mix Policy',
        },
        {
          key: 'au_pair',
          label: 'Au Pair/Demi Pair',
        },
        {
          key: 'dance_programs',
          label: 'Dance Programs',
        },
        {
          key: 'internship_programs',
          label: 'Internship Programs',
        },
        {
          key: 'volunteer_programs',
          label: 'Volunteer Programs',
        },
        {
          key: 'small_school',
          label: 'Small School',
        },
        {
          key: 'big_school',
          label: 'Big School',
        },
        {
          key: 'small_class_size',
          label: 'Small Class size'
        },
        {
          key: 'evening_class',
          label: 'Evening Class'
        },
        {
          key: 'low_priced',
          label: 'Low-Priced'
        },
        {
          key: 'global_expansion',
          label: 'Global Expansion'
        }
      ]
    }
  },
  {
    id: 'facilities',
    label: 'Facilities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_facilities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'indoor_swimming_pool',
          label: 'Indoor swimming pool',
        },
        {
          key: 'outdoor_swimming_pool',
          label: 'Outdoor swimming pool',
        },
        {
          key: 'sauna',
          label: 'Sauna',
        },
        {
          key: 'study_room',
          label: 'Study room',
        },
        {
          key: 'lounge',
          label: 'Lounge',
        },
        {
          key: 'sports_lounge',
          label: 'Sports lounge',
        },
        {
          key: 'toeic_exam_preparation',
          label: 'TOEIC exam preparation',
        },
        {
          key: 'cctv',
          label: 'CCTV',
        },
        {
          key: 'free_wifi',
          label: 'Free Wi-Fi',
        },
        {
          key: 'rooftop_terrace',
          label: 'Rooftop Terrace',
        },
        {
          key: 'patio',
          label: 'Patio',
        },
        {
          key: 'balcony',
          label: 'Balcony',
        },
        {
          key: 'laundry',
          label: 'Laundry'
        },
        {
          key: 'cafeteria',
          label: 'Cafeteria'
        },
        {
          key: 'restaurant',
          label: 'Restaurant'
        },
        {
          key: 'convenience_store',
          label: 'Convenience store'
        },
        {
          key: 'supermarket',
          label: 'Supermarket'
        },
        {
          key: 'room_services',
          label: 'Room services'
        },
        {
          key: 'cinema_room',
          label: 'Cinema room'
        },
        ,
        {
          key: 'gaming_area',
          label: 'Gaming area'
        },
        {
          key: 'bbq_area',
          label: 'BBQ area'
        },
        {
          key: 'shared_kitchen',
          label: 'Shared kitchen'
        },
        {
          key: 'elevator',
          label: 'Elevator'
        },
        {
          key: 'escalator',
          label: 'Escalator'
        },
        {
          key: 'bicycle_rental_service',
          label: 'Bicycle rental service'
        },
        {
          key: 'car_parkig_area',
          label: 'Car parkig area'
        },
        {
          key: 'bicycle_parking_area',
          label: 'Bicycle parking area'
        },
        {
          key: 'gym',
          label: 'Gym'
        },
        {
          key: 'fitnass_studio',
          label: 'Fitnass_studio'
        },
        {
          key: 'jogging_track',
          label: 'Jogging track'
        },
        {
          key: 'futsal_court',
          label: 'Futsal court'
        },
        {
          key: 'soccer_court',
          label: 'Soccer court'
        },
        {
          key: 'ping_pong_table',
          label: 'Ping pong table'
        },
        {
          key: 'billiard_table',
          label: 'Billiard table'
        },
        {
          key: 'golf_cource',
          label: 'Golf cource'
        },
        {
          key: 'tennis_court',
          label: 'Tennis court'
        },
        {
          key: 'basketball_court',
          label: 'Basketball court'
        }
      ]
    }
  },
  {
    id: 'requiredLevel',
    label: 'Required Level',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_required_level'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'beginner', label: 'Beginner' },
        { key: 'intermediate', label: 'Intermediate' },
        { key: 'advanced', label: 'Advanced' },
      ],
    },
  },
  {
    id: 'room_facilities',
    label: 'Room Facilities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_facilities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'single_bed',
          label: 'Single bed',
        },
        {
          key: 'semi_double_bed',
          label: 'Semi-double bed',
        },
        {
          key: 'double_bed',
          label: 'Double bed',
        },
        {
          key: 'bunk_bed',
          label: 'Bunk bed',
        },
        {
          key: 'shower',
          label: 'Shower',
        },
        {
          key: 'bathtub',
          label: 'Bathtub',
        },
        {
          key: 'dining_area',
          label: 'Dining area',
        },
        {
          key: 'tv',
          label: 'TV',
        },
        {
          key: 'air_conditioner',
          label: 'Air conditioner',
        },
        {
          key: 'fridge',
          label: 'Fridge',
        },
        {
          key: 'heating',
          label: 'Heating',
        },
        {
          key: 'kitchen',
          label: 'Kitchen',
        },
        {
          key: 'electric_kettle',
          label: 'Electric kettle',
        },
        {
          key: 'microwave',
          label: 'Microwave'
        },
        {
          key: 'toaster',
          label: 'Toaster'
        },
        {
          key: 'rice_cooker',
          label: 'Rice cooker'
        },
        {
          key: 'dishwasher',
          label: 'Dishwasher'
        },
        {
          key: 'kitchenwash',
          label: 'Kitchenwash'
        },
        {
          key: 'air_purifier',
          label: 'Air purifier'
        },
        {
          key: 'hairdryer',
          label: 'Hairdryer'
        },
        {
          key: 'coffee_brewer',
          label: 'Coffee brewer'
        },
        {
          key: 'desk_lamp',
          label: 'Desk lamp'
        },
        {
          key: 'desk',
          label: 'Desk'
        },
        {
          key: 'chair',
          label: 'Chair'
        },
        {
          key: 'wardrobe',
          label: 'Wardrobe'
        },
        {
          key: 'closet',
          label: 'Closet'
        },
        {
          key: 'safe',
          label: 'Safe'
        },
        {
          key: 'sofa',
          label: 'Sofa'
        }
      ],
    },
  },
  {
    id: 'courseStartDates',
    label: 'Course Start Dates',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_course_start_date'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'every_monday', label: 'Every Monday' },
        { key: 'every_tuesday', label: 'Every Tuesday' },
        { key: 'every_wednesday', label: 'Every Wednesday' },
        { key: 'every_thursday', label: 'Every Thursday' },
        { key: 'every_friday', label: 'Every Friday' },
        { key: 'every_saturday', label: 'Every Saturday' },
        { key: 'every_sunday', label: 'Every Sunday' }
      ],
    },
  },
  {
    id: 'classDays',
    label: 'Class Days',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_class_days'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
        { key: 'sunday', label: 'Sunday' }
      ],
    },
  },

  {
    id: 'accommodations',
    label: 'Accommodations',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_accommodations'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'accomodation1', label: 'Accomodation1' },
        { key: 'accomodation2', label: 'Accomodation2' },
        { key: 'accomodation3', label: 'Accomodation3' }
      ],
    },
  },
  {
    id: 'schoolSize',
    label: 'School size',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_school_size'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'Large (300+)', label: 'Large (300+)' },
        { key: 'medium', label: 'Medium'},
        { key: 'small', label: 'Small' }
      ],
    },
  },
  /*{
    id: 'schoolActivities',
    label: 'School Activities',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_school_activities'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {key: 'City Tour', label: 'City Tour'},
        {key: 'Museum Tour', label: 'Museum Tour'}
      ],
    },
  },*/
  
   {
    id: 'schoolActivities',
    label: 'School Activities',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_schoolActivities'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'City Tour', label: 'City Tour' },
        { key: 'Museum Tour', label: 'Museum Tour' },
      ],
    },
  },
  
  {
    id: 'country',
    label: 'Country',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_country'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'USA', label: 'USA' },
        { key: 'CAN', label: 'CAN' },
        { key: 'AUS', label: 'AUS' },
        { key: 'NZL', label: 'NZL' },
        { key: 'GBR', label: 'GBR' },
        { key: 'IRL', label: 'IRL' },
        { key: 'MLT', label: 'MLT' },
        { key: 'ZAF', label: 'ZAF' },
        { key: 'ARE', label: 'ARE' },
        { key: 'PHL', label: 'PHL' },
        { key: 'MYS', label: 'MYS' },
        { key: 'FJI', label: 'FJI' },
      ],
    },
  },
  
  {
    id: 'city',
    label: 'City',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_city'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'Los Angeles', label: 'Los Angeles' },
        { key: 'San Diego', label: 'San Diego' },
        { key: 'San Francisco', label: 'San Francisco' },
        { key: 'New York', label: 'New York' },
        { key: 'Boston', label: 'Boston' },
        { key: 'Miami', label: 'Miami' },
        { key: 'Chicago', label: 'Chicago' },
        { key: 'Seattle', label: 'Seattle' },
        { key: 'Honolulu', label: 'Honolulu' },
        { key: 'Vancouver', label: 'Vancouver' },
        { key: 'Toronto', label: 'Toronto' },
        { key: 'Montreal', label: 'Montreal' },
        { key: 'Calgary', label: 'Calgary' },
        { key: 'Victoria', label: 'Victoria' },
        { key: 'Sydney', label: 'Sydney' },
        { key: 'Melbourne', label: 'Melbourne' },
        { key: 'Gold coast', label: 'Gold coast' },
        { key: 'Brisbane', label: 'Brisbane' },
        { key: 'Perth', label: 'Perth' },
        { key: 'Cairns', label: 'Cairns' },
        { key: 'Adelade', label: 'Adelade' },
        { key: 'Auckland', label: 'Auckland' },
        { key: 'Christchurch', label: 'Christchurch' },
        { key: 'Wellington', label: 'Wellington' },
        { key: 'Queens Town', label: 'Queens Town' },
        { key: 'London', label: 'London' },
        { key: 'Manchester', label: 'Manchester' },
        { key: 'Oxford', label: 'Oxford' },
        { key: 'Liverpool', label: 'Liverpool' },
        { key: 'Brighton', label: 'Brighton' },
        { key: 'Edinburgh', label: 'Edinburgh' },
        { key: 'Dublin', label: 'Dublin' },
        { key: 'Cork', label: 'Cork' },
        { key: 'Goalway', label: 'Goalway' },
        { key: 'Valletta', label: 'Valletta' },
        { key: 'St. Julian', label: 'St. Julian' },
        { key: 'Sleehma', label: 'Sleehma' },
        { key: 'Gozo', label: 'Gozo' },
        { key: 'Cape Town', label: 'Cape Town' },
        { key: 'Pretoria', label: 'Pretoria' },
        { key: 'Dubai', label: 'Dubai' },
        { key: 'Abu Dhabi', label: 'Abu Dhabi' },
        { key: 'Cebu', label: 'Cebu' },
        { key: 'Buggio', label: 'Buggio' },
        { key: 'Clerk', label: 'Clerk' },
        { key: 'Manila', label: 'Manila' },
        { key: 'Bacolo', label: 'Bacolo' },
        { key: 'Iloilo', label: 'Iloilo' },
        { key: 'Davao', label: 'Davao' },
        { key: 'kuala lumpur', label: 'kuala lumpur' },
        { key: 'Kota Kinabalu', label: 'Kota Kinabalu' },
        { key: 'Nandy', label: 'Nandy' },
        { key: 'Helsinki', label: 'Helsinki' }
      ],
    },
  },

  {
    id: 'schoolFacilities',
    label: 'school Facilities',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_school_facilities'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {key: 'Cafeteria', label: 'Cafeteria'},
        {key: 'Student louge', label: 'Student louge'},
        {key: 'Accommodation', label: 'Accommodation'},
        {key: 'Clubs and societies', label: 'Clubs and societies'},
      ],
    },
  },

  {
    id: 'classroomEquipments',
    label: 'Classroom Equipments',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_classroom_equipments'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {key: 'Air Conditioning', label: 'Air Conditioning'},
        {key: 'Interactive Board', label: 'Interactive Board'},
        {key: 'Video Conferencing Equipment', label: 'Video Conferencing Equipment'},
        {key: 'Lecture Capture Equipment', label: 'Lecture Capture Equipment'},
        {key: 'Web-Conferencing', label: 'Web-Conferencing'},
        {key: 'Zoom Rooms', label: 'Zoom Rooms'}
      ],
    },
  }
];

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};
