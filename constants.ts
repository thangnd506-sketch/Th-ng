
import { Region, Place, Food } from './types';

export const VIETNAM_PLACES: Place[] = [
  {
    id: 'sapa',
    name: 'Sa Pa',
    region: Region.NORTH,
    description: 'Thị trấn trong mây với những thửa ruộng bậc thang kỳ vĩ và đỉnh Fansipan huyền thoại.',
    climate: 'Cận nhiệt đới ẩm, ôn đới, có tuyết rơi vào mùa đông.',
    bestTime: 'Tháng 3-5 hoặc tháng 9-11.',
    image: 'https://images.unsplash.com/photo-1504457047772-27fb181ccc43?q=80&w=800',
    rating: 4.9,
    topSpots: [
      { name: 'Fansipan', image: 'https://picsum.photos/seed/fansipan/400/300', rating: 4.9 },
      { name: 'Bản Cát Cát', image: 'https://picsum.photos/seed/catcat/400/300', rating: 4.7 }
    ],
    specialties: ['Thắng cố', 'Lợn cắp nách', 'Cá hồi Sa Pa'],
    festivals: ['Lễ hội Khèn Sáo']
  },
  {
    id: 'halong',
    name: 'Vịnh Hạ Long',
    region: Region.NORTH,
    description: 'Di sản thiên nhiên thế giới với hàng ngàn đảo đá vôi vươn lên từ làn nước xanh ngọc.',
    climate: 'Nhiệt đới ven biển, hai mùa rõ rệt.',
    bestTime: 'Tháng 4-6 hoặc tháng 9-11.',
    image: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=800',
    rating: 5.0,
    topSpots: [
      { name: 'Đảo Ti Tốp', image: 'https://picsum.photos/seed/titop/400/300', rating: 4.8 },
      { name: 'Hang Sửng Sốt', image: 'https://picsum.photos/seed/sungsot/400/300', rating: 4.9 }
    ],
    specialties: ['Chả mực Hạ Long', 'Sá sùng', 'Ruốc lỗ'],
    festivals: ['Carnaval Hạ Long']
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    region: Region.NORTH,
    description: 'Thủ đô ngàn năm văn hiến với vẻ đẹp cổ kính xen lẫn hiện đại.',
    climate: 'Nhiệt đới gió mùa, 4 mùa rõ rệt.',
    bestTime: 'Mùa thu (tháng 9-11).',
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=800',
    rating: 4.8,
    topSpots: [
      { name: 'Phố Cổ', image: 'https://picsum.photos/seed/oldquarter/400/300', rating: 4.9 },
      { name: 'Hồ Hoàn Kiếm', image: 'https://picsum.photos/seed/hoankiem/400/300', rating: 4.8 }
    ],
    specialties: ['Bún Chả', 'Phở Bò', 'Cà phê trứng'],
    festivals: ['Lễ hội chùa Hương']
  },
  {
    id: 'hue',
    name: 'Huế',
    region: Region.CENTRAL,
    description: 'Cố đô tĩnh lặng với những lăng tẩm uy nghi và nền ẩm thực cung đình tinh tế.',
    climate: 'Nhiệt đới gió mùa, mùa mưa kéo dài.',
    bestTime: 'Tháng 1 đến tháng 4.',
    image: 'https://images.unsplash.com/photo-1585444797743-f6614489a81f?q=80&w=800',
    rating: 4.7,
    topSpots: [
      { name: 'Đại Nội Huế', image: 'https://picsum.photos/seed/citadel/400/300', rating: 4.9 },
      { name: 'Chùa Thiên Mụ', image: 'https://picsum.photos/seed/thienmu/400/300', rating: 4.7 }
    ],
    specialties: ['Bún bò Huế', 'Cơm hến', 'Bánh bột lọc'],
    festivals: ['Festival Huế']
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    region: Region.CENTRAL,
    description: 'Thành phố đáng sống nhất Việt Nam với những cây cầu huyền thoại và bãi biển Mỹ Khê.',
    climate: 'Nhiệt đới, hai mùa mưa và khô.',
    bestTime: 'Tháng 2 đến tháng 8.',
    image: 'https://images.unsplash.com/photo-1559592443-7f87a79f6544?q=80&w=800',
    rating: 4.9,
    topSpots: [
      { name: 'Bà Nà Hills', image: 'https://picsum.photos/seed/banahills/400/300', rating: 4.9 },
      { name: 'Cầu Rồng', image: 'https://picsum.photos/seed/dragon/400/300', rating: 4.8 }
    ],
    specialties: ['Mì Quảng', 'Bánh tráng cuốn thịt heo'],
    festivals: ['Lễ hội pháo hoa quốc tế']
  },
  {
    id: 'hoian',
    name: 'Hội An',
    region: Region.CENTRAL,
    description: 'Thương cảng cổ xưa với những dãy nhà vàng rực rỡ và lồng đèn lung linh về đêm.',
    climate: 'Nhiệt đới, ôn hòa hơn Huế.',
    bestTime: 'Tháng 2 đến tháng 5.',
    image: 'https://images.unsplash.com/photo-1599708153386-62e2d0903332?q=80&w=800',
    rating: 4.9,
    topSpots: [
      { name: 'Chùa Cầu', image: 'https://picsum.photos/seed/bridge/400/300', rating: 4.8 },
      { name: 'Rừng dừa Bảy Mẫu', image: 'https://picsum.photos/seed/coconut/400/300', rating: 4.6 }
    ],
    specialties: ['Cao lầu', 'Cơm gà Hội An'],
    festivals: ['Đêm rằm phố cổ']
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    region: Region.CENTRAL,
    description: 'Thành phố ngàn hoa với không khí se lạnh quanh năm và vẻ đẹp mộng mơ.',
    climate: 'Ôn đới núi cao.',
    bestTime: 'Tháng 11 đến tháng 3 (mùa hoa).',
    image: 'https://images.unsplash.com/photo-1585038896038-5117ad133671?q=80&w=800',
    rating: 4.8,
    topSpots: [
      { name: 'Hồ Tuyền Lâm', image: 'https://picsum.photos/seed/tuyenlam/400/300', rating: 4.7 },
      { name: 'Lang Biang', image: 'https://picsum.photos/seed/langbiang/400/300', rating: 4.8 }
    ],
    specialties: ['Lẩu gà lá é', 'Bánh tráng nướng', 'Hồng treo gió'],
    festivals: ['Festival Hoa Đà Lạt']
  },
  {
    id: 'hcmc',
    name: 'Hồ Chí Minh',
    region: Region.SOUTH,
    description: 'Trung tâm kinh tế năng động nhất cả nước, nơi giao thoa văn hóa Đông Tây.',
    climate: 'Nhiệt đới xích đạo, nóng quanh năm.',
    bestTime: 'Tháng 12 đến tháng 4.',
    image: 'https://images.unsplash.com/photo-1529139513065-07b2ee0b9e9b?q=80&w=800',
    rating: 4.6,
    topSpots: [
      { name: 'Dinh Độc Lập', image: 'https://picsum.photos/seed/reunification/400/300', rating: 4.7 },
      { name: 'Nhà thờ Đức Bà', image: 'https://picsum.photos/seed/notredame/400/300', rating: 4.6 }
    ],
    specialties: ['Cơm tấm', 'Bánh mì Sài Gòn', 'Hủ tiếu Nam Vang'],
    festivals: ['Đường hoa Nguyễn Huệ']
  },
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    region: Region.SOUTH,
    description: 'Đảo Ngọc với những bãi cát trắng mịn và nước biển trong xanh như ngọc bích.',
    climate: 'Nhiệt đới gió mùa, hai mùa mưa khô.',
    bestTime: 'Tháng 11 đến tháng 4.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800',
    rating: 4.9,
    topSpots: [
      { name: 'Bãi Sao', image: 'https://picsum.photos/seed/sao/400/300', rating: 4.8 },
      { name: 'VinWonders', image: 'https://picsum.photos/seed/vinwonders/400/300', rating: 4.9 }
    ],
    specialties: ['Gỏi cá trích', 'Bún quậy', 'Rượu sim'],
    festivals: ['Lễ hội Nghinh Ông']
  }
];

export const FOOD_LIST: Food[] = [
  {
    id: 'f1',
    name: 'Phở Bò',
    region: Region.NORTH,
    image: 'https://picsum.photos/seed/pho/400/300',
    description: 'Món ăn quốc hồn quốc túy của Việt Nam với nước dùng thanh ngọt từ xương bò.',
    priceRange: '40,000 - 100,000 VND',
    type: 'Street Food',
    tags: ['Must-try', 'Hà Nội'],
    recommendedPlaces: [
      { name: 'Phở Gia Truyền', address: '49 Bát Đàn, Hà Nội' }
    ]
  },
  {
    id: 'f2',
    name: 'Bánh Mì',
    region: Region.SOUTH,
    image: 'https://picsum.photos/seed/banhmi/400/300',
    description: 'Sự kết hợp hoàn hảo giữa vỏ bánh giòn tan và nhân thịt, pate, đồ chua đậm đà.',
    priceRange: '20,000 - 60,000 VND',
    type: 'Street Food',
    tags: ['Must-try', 'Sài Gòn'],
    recommendedPlaces: [
      { name: 'Bánh Mì Huỳnh Hoa', address: '26 Lê Thị Riêng, TP.HCM' }
    ]
  },
  {
    id: 'f3',
    name: 'Bún Bò Huế',
    region: Region.CENTRAL,
    image: 'https://picsum.photos/seed/bunbo/400/300',
    description: 'Đặc sản Cố đô với vị cay nồng của sả ớt và nước dùng thơm mùi mắm ruốc.',
    priceRange: '35,000 - 70,000 VND',
    type: 'Street Food',
    tags: ['Cay nồng', 'Huế'],
    recommendedPlaces: [
      { name: 'Bún Bò Mụ Rơi', address: '1 Nguyễn Chí Diểu, Huế' }
    ]
  }
];

export const REGION_COLORS = {
  [Region.NORTH]: 'fill-red-400 hover:fill-red-500',
  [Region.CENTRAL]: 'fill-yellow-400 hover:fill-yellow-500',
  [Region.SOUTH]: 'fill-green-400 hover:fill-green-500'
};
