import { Amenity, FaqItem, RoomId, RoomInfo, Testimonial, TimelineMoment } from '../types';

export const ROOMS: Record<RoomId, RoomInfo> = {
  garden: {
    id: 'garden',
    name: 'Garden Room',
    price: 95,
    size: '28 m²',
    bed: '1 queen bed',
    guests: 'Up to 2',
    desc: 'Quiet and green, opening onto a shaded garden with olive trees. Ideal for slow mornings.',
    extras: 'Garden patio · Rain shower · Pet friendly',
    line: 'Olive trees, lavender and a glimpse of sea.'
  },
  sea: {
    id: 'sea',
    name: 'Sea View Room',
    price: 140,
    size: '34 m²',
    bed: '1 king bed',
    guests: 'Up to 2',
    desc: 'A wide window and a private balcony facing the Mediterranean. Our most loved room.',
    extras: 'Private balcony · Upper floor · Espresso machine',
    line: 'Open water, a sailboat and the lighthouse.'
  },
  suite: {
    id: 'suite',
    name: 'Signature Suite',
    price: 230,
    size: '58 m²',
    bed: 'King + sofa bed',
    guests: 'Up to 4',
    desc: 'A corner suite with a large terrace, a deep bathtub and a panoramic view of the sea and the city.',
    extras: 'Corner terrace · Deep bathtub · Lounge area',
    line: 'A corner terrace and the whole bay.'
  }
};

export const ROOM_IDS: RoomId[] = ['garden', 'sea', 'suite'];

export const AMENITIES: Amenity[] = [
  { iconName: 'wifi', title: 'Fast Wi-Fi', description: 'Throughout the hotel.' },
  { iconName: 'umbrella', title: 'Private beach', description: 'Free for all guests.' },
  { iconName: 'utensils', title: 'Restaurant', description: 'Mediterranean kitchen, open all day.' },
  { iconName: 'car', title: 'Free parking', description: 'Secure and on-site.' },
  { iconName: 'wind', title: 'Air conditioning', description: 'Quiet and individually controlled.' },
  { iconName: 'clock', title: '24-hour reception', description: 'Always someone to help.' },
  { iconName: 'plane', title: 'Airport transfer', description: 'On request, 45 minutes from the airport.' },
  { iconName: 'paw', title: 'Pet friendly', description: 'Small pets welcome in Garden Rooms.' }
];

export const TIMELINE: TimelineMoment[] = [
  {
    time: '7:30 AM',
    iconName: 'coffee',
    title: 'Breakfast on the terrace',
    description: 'Fresh bread, local honey, figs and strong coffee, served with the sea in front of you.'
  },
  {
    time: '11:00 AM',
    iconName: 'sun',
    title: 'The private beach',
    description: 'Sunbeds, umbrellas and calm shallow water, just a two-minute walk from your door.'
  },
  {
    time: '2:00 PM',
    iconName: 'utensils',
    title: 'Long lunch',
    description: 'Grilled fish and seasonal salads at our restaurant, with no rush at all.'
  },
  {
    time: '6:30 PM',
    iconName: 'sunset',
    title: 'Golden hour',
    description: 'Drinks on the rooftop while the sun drops behind the Citadel.'
  },
  {
    time: '9:30 PM',
    iconName: 'moon',
    title: 'Alexandria night',
    description: 'A quiet stroll along the Corniche, then sleep with the balcony door cracked.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'We opened the curtains at sunrise and just stayed there with our coffee for an hour. Best morning of our trip.',
    name: 'Laila and Omar',
    type: 'Honeymoon',
    initials: 'LO'
  },
  {
    quote: 'I checked the sunset view on the website before booking, and the real thing was even better. Quiet, kind staff, perfect small hotel.',
    name: 'Daniel',
    type: 'Solo traveler',
    initials: 'D'
  },
  {
    quote: 'The corner suite terrace is magnificent. Watching Alexandria light up at night with the sea breeze was unforgettable.',
    name: 'Sophia and Karim',
    type: 'Weekend getaway',
    initials: 'SK'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'What time are check-in and check-out?',
    answer: 'Check-in is from 2:00 PM and check-out is until 12:00 PM. Early arrival or late departure can often be arranged on request.'
  },
  {
    question: 'Is breakfast included?',
    answer: 'Yes. A terrace breakfast is included with every room.'
  },
  {
    question: 'Can I choose a specific view or floor?',
    answer: 'Please mention it in your request and we will do our best. Sea View Rooms and the Signature Suite are on the upper floors.'
  },
  {
    question: 'Do you offer airport transfers?',
    answer: 'Yes, on request. The airport is about 45 minutes away, and we can arrange a driver to meet you.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Free cancellation up to 7 days before arrival. After that, the first night is charged.'
  },
  {
    question: 'Is the View Studio what my room will look like?',
    answer: 'It is an illustration made to show the mood of each room at different hours. Your real view depends on the room and the season.'
  }
];
