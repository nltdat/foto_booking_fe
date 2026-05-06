export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  categories: string[];
  intro: string;
  sections: BlogSection[];
  checklist: string[];
};

export const blogCategories = [
  "Chuyện Nhiếp Ảnh",
  "English article",
  "Nhiếp ảnh gia Potonow",
  "Sự kiện",
  "Về Potonow",
  "E-magazine"
];

export const blogPosts: BlogPost[] = [
  {
    slug: "ung-dung-potonow-chinh-thuc-ra-mat",
    title:
      "Ứng dụng Potonow chính thức ra mắt: Trải nghiệm đặt lịch chụp ảnh nhanh chóng, tiện lợi và linh hoạt",
    excerpt:
      "Một trải nghiệm đặt lịch chụp ảnh gọn hơn, giúp khách hàng tìm photographer, mô tả nhu cầu và theo dõi buổi chụp trên cùng một nền tảng.",
    image: "/blogs/app-potonow-launch.jpg",
    date: "01/07/2025",
    readTime: "4 phút đọc",
    author: "Hilu Editorial",
    categories: ["Về Potonow", "Sự kiện"],
    intro:
      "Việc đặt lịch chụp ảnh thường bắt đầu bằng nhiều đoạn chat rời rạc: hỏi giá, gửi concept, kiểm tra lịch, thống nhất địa điểm rồi mới chốt được buổi chụp. Bài viết này tóm tắt cách một nền tảng đặt lịch có thể gom các bước đó thành hành trình rõ ràng hơn.",
    sections: [
      {
        heading: "Từ ý tưởng đến buổi chụp",
        paragraphs: [
          "Một trải nghiệm đặt lịch tốt cần giúp khách hàng nói rõ mình muốn chụp gì, ở đâu, khi nào và ngân sách dự kiến ra sao. Khi thông tin này được chuẩn hóa ngay từ đầu, photographer có đủ dữ liệu để phản hồi nhanh hơn.",
          "Điểm quan trọng không nằm ở việc thêm thật nhiều bước, mà là làm cho mỗi bước có mục đích. Người đặt lịch cần thấy mình đang tiến gần hơn đến buổi chụp, còn photographer cần nhìn thấy yêu cầu đủ rõ để đưa ra đề xuất phù hợp."
        ],
        bullets: [
          "Chọn thể loại và bối cảnh chụp trước khi nhập chi tiết.",
          "Thể hiện ngân sách dự kiến để giảm vòng thương lượng.",
          "Giữ toàn bộ trao đổi, đề nghị và lịch hẹn trong một luồng."
        ]
      },
      {
        heading: "Vì sao trải nghiệm di động quan trọng",
        paragraphs: [
          "Nhu cầu chụp ảnh thường xuất hiện rất nhanh: một chuyến đi, một mùa hoa, một dịp tốt nghiệp hoặc một sự kiện gia đình. Giao diện di động giúp người dùng lưu lại ý tưởng và gửi yêu cầu ngay khi cần.",
          "Với photographer, việc nhận yêu cầu rõ ràng trên điện thoại cũng giúp phản hồi kịp thời hơn, đặc biệt khi lịch chụp thay đổi liên tục theo thời tiết, địa điểm và thời gian trống."
        ]
      },
      {
        heading: "Một luồng đặt lịch đáng tin hơn",
        paragraphs: [
          "Khi thông tin buổi chụp được lưu lại có cấu trúc, cả hai bên dễ kiểm tra lại yêu cầu, thời gian và chi phí. Điều này giảm hiểu nhầm và làm cho trải nghiệm sau buổi chụp, như chọn ảnh hoặc nhận ảnh, nhẹ nhàng hơn.",
          "Với các nền tảng như hilu.pics, phần quan trọng là giữ mọi thứ đủ trực quan để người mới cũng có thể đặt lịch mà không cần hiểu quá nhiều thuật ngữ nhiếp ảnh."
        ]
      }
    ],
    checklist: [
      "Chuẩn bị 2-3 ảnh tham khảo trước khi tạo yêu cầu.",
      "Ghi rõ số người chụp, bối cảnh và thời gian mong muốn.",
      "Chốt deadline nhận ảnh ngay từ bước trao đổi."
    ]
  },
  {
    slug: "tat-tan-tat-nhung-dieu-can-biet-truoc-khi-chup-anh-doanh-nghiep",
    title: "Tất tần tật những điều cần biết trước khi chụp ảnh doanh nghiệp",
    excerpt:
      "Bộ ảnh doanh nghiệp nên thể hiện đúng tinh thần thương hiệu, vai trò đội ngũ và cách công ty muốn xuất hiện trước khách hàng.",
    image: "/blogs/corporate-photography.jpg",
    date: "17/02/2026",
    readTime: "5 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Chụp ảnh doanh nghiệp không chỉ là chụp một nhóm người mặc đồng phục. Một bộ ảnh tốt cần kể được câu chuyện về con người, không gian làm việc, sản phẩm và mức độ chuyên nghiệp của thương hiệu.",
    sections: [
      {
        heading: "Xác định mục đích sử dụng ảnh",
        paragraphs: [
          "Trước khi đặt lịch, doanh nghiệp nên xác định ảnh sẽ dùng cho website, hồ sơ năng lực, tuyển dụng, truyền thông nội bộ hay mạng xã hội. Mỗi mục đích sẽ kéo theo cách set bối cảnh và tỷ lệ khung hình khác nhau.",
          "Nếu ảnh dùng cho website, hãy chuẩn bị thêm khoảng trống trong khung hình để đặt chữ. Nếu ảnh dùng cho profile nhân sự, ánh sáng và biểu cảm cần đồng nhất hơn."
        ],
        bullets: [
          "Ảnh chân dung nhân sự cần nền sạch và ánh sáng ổn định.",
          "Ảnh văn phòng cần thể hiện không gian thật, tránh dàn dựng quá mức.",
          "Ảnh hoạt động nên có kịch bản để đội ngũ tương tác tự nhiên."
        ]
      },
      {
        heading: "Brief càng rõ, buổi chụp càng gọn",
        paragraphs: [
          "Một brief tốt nên có danh sách người chụp, số lượng ảnh cần bàn giao, deadline, địa điểm, màu sắc thương hiệu và ví dụ ảnh tham khảo. Điều này giúp photographer chuẩn bị thiết bị, lens và lịch trình hợp lý.",
          "Nếu có nhiều phòng ban, hãy chia buổi chụp theo nhóm để tránh chờ đợi. Người phụ trách nội bộ nên có mặt để kiểm tra trang phục, thứ tự chụp và các chi tiết thương hiệu xuất hiện trong ảnh."
        ]
      },
      {
        heading: "Đầu tư vào sự nhất quán",
        paragraphs: [
          "Một bộ ảnh doanh nghiệp có giá trị lâu dài khi các ảnh nhìn cùng một hệ thống: màu sắc nhất quán, bố cục có chủ ý và phong cách phù hợp với ngành nghề.",
          "Vì vậy, hãy chọn photographer có kinh nghiệm với môi trường doanh nghiệp hoặc có portfolio thể hiện khả năng điều phối nhóm đông người."
        ]
      }
    ],
    checklist: [
      "Lập danh sách người chụp và khung giờ cụ thể.",
      "Chuẩn bị guideline màu sắc, trang phục và bối cảnh.",
      "Chốt định dạng ảnh cần nhận: ngang, dọc, vuông hoặc banner."
    ]
  },
  {
    slug: "tuyet-chieu-chup-anh-voi-hoa-huong-duong",
    title: "Tuyệt chiêu chụp ảnh với hoa hướng dương bắt trọn sắc vàng dưới nắng rực rỡ",
    excerpt:
      "Hoa hướng dương có màu sắc nổi bật, nhưng để ảnh không bị gắt sáng cần chọn thời điểm, trang phục và góc máy hợp lý.",
    image: "/blogs/sunflower-portrait.jpg",
    date: "14/02/2026",
    readTime: "4 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Cánh đồng hoa hướng dương luôn tạo cảm giác tươi sáng, nhưng ánh nắng mạnh và nền vàng dày đặc cũng dễ làm ảnh bị chói. Một vài chuẩn bị nhỏ sẽ giúp bộ ảnh mềm hơn và giữ được cảm giác rực rỡ vừa đủ.",
    sections: [
      {
        heading: "Chọn thời điểm ánh sáng mềm",
        paragraphs: [
          "Buổi sáng sớm hoặc cuối chiều là thời điểm dễ chụp nhất. Ánh sáng khi đó xiên nhẹ, tạo khối trên gương mặt và giảm tình trạng nheo mắt.",
          "Nếu phải chụp giữa trưa, hãy tìm hàng hoa có bóng đổ hoặc dùng phụ kiện như nón, khăn mỏng để tạo vùng chuyển sáng tự nhiên."
        ]
      },
      {
        heading: "Trang phục nên tách khỏi nền",
        paragraphs: [
          "Vì nền đã có nhiều sắc vàng, trang phục trắng, xanh denim, xanh lá dịu hoặc nâu nhạt sẽ giúp chủ thể nổi bật mà không tranh màu với hoa.",
          "Nên tránh các họa tiết quá dày hoặc màu vàng gần giống nền, vì ảnh có thể bị rối và mất điểm nhấn."
        ],
        bullets: [
          "Váy trắng hoặc sơ mi trắng cho cảm giác trong trẻo.",
          "Denim tạo chất đời thường, phù hợp ảnh picnic.",
          "Phụ kiện nhỏ như nón cói hoặc túi vải giúp tay không bị trống."
        ]
      },
      {
        heading: "Tạo dáng cùng chiều cao hoa",
        paragraphs: [
          "Hãy tận dụng hàng hoa để tạo lớp trước và sau chủ thể. Photographer có thể chụp xuyên qua vài bông hoa ở tiền cảnh để ảnh có chiều sâu hơn.",
          "Người chụp nên di chuyển chậm, tương tác với hoa bằng tay hoặc ánh nhìn thay vì chỉ đứng yên nhìn thẳng vào máy."
        ]
      }
    ],
    checklist: [
      "Mang theo khăn giấy thấm mồ hôi và nước uống.",
      "Chọn giày dễ đi nếu địa điểm có đất mềm.",
      "Chụp cả ảnh cận mặt, toàn thân và ảnh tương tác với hoa."
    ]
  },
  {
    slug: "xu-huong-qua-tet-cho-bo-me-2026",
    title: "Xu hướng quà tết cho bố mẹ 2026: Tặng gì để trọn vẹn chữ hiếu?",
    excerpt:
      "Một bộ ảnh gia đình hoặc buổi chụp Tết có thể trở thành món quà tinh thần lâu bền hơn nhiều món quà vật chất.",
    image: "/blogs/tet-gifts-family.jpg",
    date: "11/02/2026",
    readTime: "4 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Mỗi dịp Tết, câu hỏi tặng gì cho bố mẹ lại trở nên quen thuộc. Bên cạnh quà sức khỏe, quà gia dụng hay chuyến du lịch ngắn, một bộ ảnh gia đình được chuẩn bị kỹ cũng là lựa chọn nhiều cảm xúc.",
    sections: [
      {
        heading: "Món quà lưu lại thời gian",
        paragraphs: [
          "Ảnh gia đình không chỉ đẹp trong mùa Tết hiện tại. Vài năm sau, bộ ảnh đó trở thành cách cả nhà nhìn lại một giai đoạn, một nụ cười hoặc một khoảnh khắc sum họp hiếm có.",
          "Nếu bố mẹ ít khi chủ động chụp ảnh, việc con cái đứng ra sắp xếp concept, trang phục và lịch chụp sẽ làm món quà trở nên chu đáo hơn."
        ]
      },
      {
        heading: "Chọn concept phù hợp với tính cách gia đình",
        paragraphs: [
          "Không phải gia đình nào cũng hợp concept cầu kỳ. Có nhà chỉ cần áo dài, phòng khách quen thuộc và vài cành hoa là đủ ấm. Có nhà lại thích ngoại cảnh, phố xuân hoặc một studio tối giản.",
          "Điều quan trọng là bố mẹ cảm thấy thoải mái. Khi mọi người tự nhiên, ảnh sẽ giữ được cảm xúc thật hơn."
        ],
        bullets: [
          "Gia đình truyền thống: áo dài, hoa đào, hoa mai, tông đỏ hoặc kem.",
          "Gia đình trẻ: trang phục đồng màu, studio sáng, bố cục tối giản.",
          "Gia đình đông người: ưu tiên lịch trình ngắn và shot list rõ."
        ]
      },
      {
        heading: "Đặt lịch sớm để tránh sát Tết",
        paragraphs: [
          "Các tuần gần Tết thường kín lịch photographer, studio và địa điểm ngoài trời. Đặt lịch sớm giúp gia đình có nhiều lựa chọn hơn và không phải chụp vội.",
          "Nếu có người lớn tuổi hoặc trẻ nhỏ, hãy chọn khung giờ ngắn, ánh sáng dễ chịu và địa điểm ít phải di chuyển."
        ]
      }
    ],
    checklist: [
      "Hỏi trước bố mẹ thích chụp tại nhà, studio hay ngoại cảnh.",
      "Chuẩn bị trang phục theo cùng một bảng màu.",
      "In một vài ảnh đẹp thành album hoặc khung ảnh sau buổi chụp."
    ]
  },
  {
    slug: "bi-kip-hanh-nghe-danh-cho-nhiep-anh-gia-potonow",
    title: "Bí kíp \"hành nghề\" dành cho nhiếp ảnh gia Potonow khi chụp hình cho khách nước ngoài",
    excerpt:
      "Khi làm việc với khách nước ngoài, photographer cần chuẩn bị kỹ hơn về giao tiếp, lịch trình và cách hướng dẫn tạo dáng.",
    image: "/blogs/foreign-client-tips.jpg",
    date: "15/01/2026",
    readTime: "4 phút đọc",
    author: "Hilu Editorial",
    categories: ["Nhiếp ảnh gia Potonow"],
    intro:
      "Khách nước ngoài thường kỳ vọng một buổi chụp gọn, đúng giờ và có hướng dẫn rõ ràng. Photographer không chỉ chụp đẹp, mà còn là người giúp họ cảm nhận địa điểm, văn hóa và nhịp điệu của thành phố.",
    sections: [
      {
        heading: "Chuẩn bị giao tiếp trước buổi chụp",
        paragraphs: [
          "Hãy gửi trước lịch trình, điểm hẹn, thời lượng và gợi ý trang phục bằng ngôn ngữ khách dễ hiểu. Nếu tiếng Anh chưa thật tự tin, bạn vẫn có thể chuẩn bị sẵn vài mẫu câu quan trọng.",
          "Khách sẽ yên tâm hơn khi biết họ cần chuẩn bị gì, buổi chụp đi qua những địa điểm nào và khi nào nhận ảnh."
        ],
        bullets: [
          "Gửi map pin chính xác thay vì mô tả chung chung.",
          "Chuẩn bị câu hướng dẫn tạo dáng ngắn, dễ hiểu.",
          "Luôn xác nhận lại giờ hẹn theo múi giờ địa phương."
        ]
      },
      {
        heading: "Làm chủ nhịp buổi chụp",
        paragraphs: [
          "Khách du lịch thường có lịch trình dày, vì vậy buổi chụp cần đúng giờ và di chuyển hợp lý. Photographer nên khảo sát trước lộ trình để tránh khu vực quá đông hoặc ánh sáng khó kiểm soát.",
          "Trong lúc chụp, hãy đưa hướng dẫn cụ thể: nhìn về hướng nào, đặt tay ở đâu, đi chậm hay đứng lại. Những chỉ dẫn nhỏ giúp khách thoải mái hơn rất nhiều."
        ]
      },
      {
        heading: "Giữ trải nghiệm chuyên nghiệp sau buổi chụp",
        paragraphs: [
          "Sau buổi chụp, hãy nhắn lại timeline chọn ảnh, chỉnh ảnh và bàn giao. Nếu có ảnh preview, gửi sớm một vài tấm đẹp sẽ tạo ấn tượng tốt.",
          "Sự chuyên nghiệp nằm ở cả quá trình, không chỉ file ảnh cuối cùng. Khi khách cảm thấy được chăm sóc, họ dễ giới thiệu dịch vụ cho bạn bè hơn."
        ]
      }
    ],
    checklist: [
      "Chuẩn bị moodboard song ngữ ngắn gọn.",
      "Mang theo pin, thẻ nhớ và phương án địa điểm dự phòng.",
      "Gửi timeline bàn giao ảnh ngay sau buổi chụp."
    ]
  },
  {
    slug: "tips-cho-nhiep-anh-gia-4-loi-pho-bien-khien-profile-bi-tu-choi",
    title: "Tips cho nhiếp ảnh gia: 4 lỗi phổ biến khiến profile của bạn bị từ chối",
    excerpt:
      "Profile photographer cần ảnh đại diện rõ, portfolio chọn lọc và phần giới thiệu đủ cụ thể để khách hàng hiểu bạn mạnh ở đâu.",
    image: "/blogs/profile-tips.jpg",
    date: "15/01/2026",
    readTime: "3 phút đọc",
    author: "Hilu Editorial",
    categories: ["Nhiếp ảnh gia Potonow"],
    intro:
      "Một profile tốt giúp khách hàng quyết định nhanh hơn. Ngược lại, profile thiếu ảnh, mô tả quá chung hoặc portfolio lộn xộn có thể khiến cơ hội bị bỏ qua dù kỹ năng chụp không tệ.",
    sections: [
      {
        heading: "Ảnh đại diện và thông tin cơ bản",
        paragraphs: [
          "Ảnh đại diện nên rõ mặt, đủ sáng và thể hiện sự chuyên nghiệp. Đây là điểm chạm đầu tiên trước khi khách xem portfolio.",
          "Thông tin khu vực hoạt động, kinh nghiệm, thể loại chụp và cách liên hệ cũng cần được điền đầy đủ để khách biết bạn có phù hợp với nhu cầu của họ hay không."
        ]
      },
      {
        heading: "Portfolio cần chọn lọc",
        paragraphs: [
          "Không nên đưa mọi ảnh từng chụp vào portfolio. Hãy chọn các bộ ảnh thể hiện đúng phong cách bạn muốn bán, có ánh sáng ổn định và màu sắc nhất quán.",
          "Nếu bạn chụp nhiều thể loại, hãy chia nhóm rõ: chân dung, cặp đôi, gia đình, sự kiện. Khách sẽ dễ hình dung năng lực của bạn hơn."
        ],
        bullets: [
          "Loại ảnh mờ, ảnh lỗi màu hoặc ảnh quá cũ.",
          "Ưu tiên series ảnh cùng concept thay vì ảnh rời rạc.",
          "Đặt ảnh mạnh nhất lên đầu profile."
        ]
      },
      {
        heading: "Giới thiệu nên cụ thể",
        paragraphs: [
          "Một câu như \"mình thích chụp ảnh\" chưa đủ để thuyết phục khách. Hãy nói rõ bạn mạnh ở thể loại nào, cách làm việc ra sao và khách sẽ nhận được gì sau buổi chụp.",
          "Sự rõ ràng giúp khách tin tưởng và cũng giúp bạn nhận được yêu cầu phù hợp hơn."
        ]
      }
    ],
    checklist: [
      "Kiểm tra lại ảnh đại diện ở kích thước nhỏ trên mobile.",
      "Chọn 12-20 ảnh tốt nhất cho mỗi nhóm portfolio.",
      "Viết phần giới thiệu bằng ngôn ngữ dễ hiểu, tránh thuật ngữ quá nặng."
    ]
  },
  {
    slug: "cach-chup-anh-chan-dung-dep-tu-nhien",
    title: "Cách chụp ảnh chân dung đẹp tự nhiên, thu hút mọi ánh nhìn",
    excerpt:
      "Ảnh chân dung tự nhiên đến từ ánh sáng phù hợp, biểu cảm thoải mái và cách photographer tạo không khí cho người được chụp.",
    image: "/blogs/natural-portrait.jpg",
    date: "15/01/2026",
    readTime: "4 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Chân dung đẹp không nhất thiết phải tạo dáng cầu kỳ. Một ánh nhìn đúng lúc, vai thả lỏng và ánh sáng vừa đủ có thể tạo ra bức ảnh có sức hút hơn nhiều kiểu pose phức tạp.",
    sections: [
      {
        heading: "Ánh sáng là nền tảng",
        paragraphs: [
          "Ánh sáng mềm giúp da mịn hơn và giảm bóng gắt trên gương mặt. Cửa sổ lớn, bóng râm ngoài trời hoặc thời điểm cuối chiều đều là lựa chọn dễ kiểm soát.",
          "Photographer nên quan sát hướng sáng trước khi đặt chủ thể. Chỉ cần xoay người vài độ, gương mặt có thể trở nên có khối và tự nhiên hơn."
        ]
      },
      {
        heading: "Biểu cảm cần được dẫn dắt",
        paragraphs: [
          "Không phải ai cũng quen đứng trước máy ảnh. Thay vì yêu cầu \"cười tự nhiên\", hãy tạo tình huống: bước đi chậm, nhìn sang một điểm cụ thể hoặc tương tác với đạo cụ.",
          "Khi người được chụp quên rằng mình đang bị quan sát, ảnh thường mềm hơn và có cảm xúc hơn."
        ],
        bullets: [
          "Bắt đầu bằng vài khung hình đơn giản để làm quen máy.",
          "Cho chủ thể xem nhanh ảnh đẹp để tăng sự tự tin.",
          "Dùng chuyển động nhẹ để tránh dáng bị cứng."
        ]
      },
      {
        heading: "Bối cảnh nên hỗ trợ, không lấn át",
        paragraphs: [
          "Một nền ảnh tốt cần làm nổi bật gương mặt. Nếu bối cảnh quá nhiều chi tiết, hãy dùng góc máy hoặc khẩu độ để tách chủ thể ra khỏi nền.",
          "Màu nền cũng nên hài hòa với trang phục. Bảng màu ít nhưng có chủ ý sẽ giúp bộ ảnh trông chuyên nghiệp hơn."
        ]
      }
    ],
    checklist: [
      "Chuẩn bị 2 bộ trang phục: một sáng màu, một trung tính.",
      "Chọn địa điểm có vùng sáng và vùng râm gần nhau.",
      "Ưu tiên biểu cảm thật thay vì pose quá phức tạp."
    ]
  },
  {
    slug: "tao-dang-va-dia-diem-check-in-chup-anh-hoa-ban-ha-noi",
    title: "Mách bạn cách tạo dáng và địa điểm check-in chụp ảnh hoa ban Hà Nội",
    excerpt:
      "Mùa hoa ban Hà Nội hợp với những khung hình nhẹ nhàng, trang phục sáng màu và lịch chụp đủ sớm để tránh đông người.",
    image: "/blogs/hoa-ban-hanoi.jpg",
    date: "15/01/2026",
    readTime: "4 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Hoa ban thường nở vào giai đoạn đầu năm, khi Hà Nội có những ngày trời dịu và ánh sáng trong. Đây là thời điểm đẹp để chụp chân dung, áo dài hoặc ảnh dạo phố.",
    sections: [
      {
        heading: "Chọn địa điểm có hàng cây thoáng",
        paragraphs: [
          "Những đoạn đường có hoa ban đẹp thường đông vào cuối tuần. Nếu muốn ảnh sạch nền, hãy đi sớm và chọn góc có khoảng cách đủ xa với xe cộ.",
          "Photographer nên khảo sát trước một vài điểm dự phòng vì hoa có thể nở không đều giữa các tuyến phố."
        ]
      },
      {
        heading: "Tạo dáng nhẹ và có chuyển động",
        paragraphs: [
          "Với hoa ban, dáng đứng thẳng quá lâu dễ làm ảnh cứng. Hãy thử bước chậm, nghiêng vai, nhìn lên tán hoa hoặc cầm nhẹ tà áo để tạo chuyển động.",
          "Nếu chụp áo dài, nên ưu tiên các dáng làm nổi đường nét trang phục nhưng vẫn giữ sự thoải mái."
        ],
        bullets: [
          "Đi bộ ngang khung hình để tà áo có độ bay.",
          "Đứng dưới tán hoa và nhìn ra xa thay vì luôn nhìn máy.",
          "Chụp cận với một vài cành hoa ở tiền cảnh."
        ]
      },
      {
        heading: "Giữ màu ảnh trong trẻo",
        paragraphs: [
          "Hoa ban hợp với màu ảnh sáng, ít tương phản gắt. Khi chỉnh màu, hãy giữ da tự nhiên và tránh đẩy hồng tím quá mạnh.",
          "Một bộ ảnh đẹp nên có cả khung toàn cảnh tuyến phố và ảnh cận biểu cảm để câu chuyện đầy đủ hơn."
        ]
      }
    ],
    checklist: [
      "Đi sớm trước giờ cao điểm.",
      "Mang giày dễ di chuyển nếu chụp ở nhiều tuyến phố.",
      "Theo dõi thời tiết vì hoa ban đẹp nhất trong ngày có nắng nhẹ."
    ]
  },
  {
    slug: "13-dia-diem-chup-hinh-tet-dep-o-sai-gon-2026",
    title: "13 địa điểm chụp hình Tết đẹp ở Sài Gòn 2026: lên đồ đi chụp ngay và luôn!",
    excerpt:
      "Sài Gòn có nhiều bối cảnh chụp Tết từ phố trung tâm, chợ hoa đến studio concept, phù hợp nhiều phong cách khác nhau.",
    image: "/blogs/tet-saigon.jpg",
    date: "22/12/2025",
    readTime: "6 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Tết ở Sài Gòn có năng lượng rất riêng: rực rỡ, nhanh, nhiều màu và luôn có góc mới để chụp. Điều quan trọng là chọn địa điểm phù hợp với concept thay vì chạy quá nhiều nơi trong một buổi.",
    sections: [
      {
        heading: "Nhóm địa điểm trung tâm",
        paragraphs: [
          "Các tuyến phố trung tâm phù hợp với concept hiện đại, áo dài cách tân hoặc ảnh dạo phố. Ưu điểm là dễ di chuyển và có nhiều lớp bối cảnh trong khoảng cách gần.",
          "Tuy nhiên, khu trung tâm thường đông. Hãy lên lịch sáng sớm để có ánh sáng tốt và ít người lọt vào khung hình."
        ],
        bullets: [
          "Phố đi bộ và các góc kiến trúc cổ.",
          "Khu cà phê có trang trí Tết.",
          "Các tuyến đường có ánh sáng đẹp vào buổi chiều."
        ]
      },
      {
        heading: "Chợ hoa và không gian truyền thống",
        paragraphs: [
          "Chợ hoa cho màu sắc phong phú, hợp với áo dài, ảnh gia đình và concept vui tươi. Khi chụp ở đây, cần tôn trọng người bán và tránh cản lối đi.",
          "Nên chọn trang phục ít họa tiết để không bị lẫn với nền nhiều hoa và đồ trang trí."
        ]
      },
      {
        heading: "Studio khi cần kiểm soát lịch trình",
        paragraphs: [
          "Nếu gia đình có trẻ nhỏ hoặc người lớn tuổi, studio là lựa chọn ổn định hơn. Bạn kiểm soát được ánh sáng, thời gian và không bị ảnh hưởng bởi thời tiết.",
          "Hãy xem kỹ set trang trí trước khi đặt lịch để đảm bảo màu sắc phù hợp với trang phục cả nhóm."
        ]
      }
    ],
    checklist: [
      "Chọn tối đa 2 địa điểm cho một buổi chụp.",
      "Mang theo phụ kiện Tết nhỏ như bao lì xì, quạt hoặc hoa.",
      "Đặt lịch sớm vì mùa Tết thường kín slot đẹp."
    ]
  },
  {
    slug: "dia-diem-chup-anh-tet-dep-o-ha-noi-2026",
    title: "Đừng bỏ lỡ loạt địa điểm chụp ảnh tết đẹp ở Hà Nội năm 2026!",
    excerpt:
      "Hà Nội hợp với ảnh Tết có chất truyền thống, màu ảnh ấm và những bối cảnh phố cổ, vườn hoa hoặc không gian kiến trúc xưa.",
    image: "/blogs/tet-hanoi.jpg",
    date: "06/12/2025",
    readTime: "5 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Tết Hà Nội có nhịp chậm và nhiều lớp ký ức. Một buổi chụp đẹp không nhất thiết phải đi xa, chỉ cần chọn đúng bối cảnh, đúng thời điểm và giữ tinh thần ấm áp của mùa xuân miền Bắc.",
    sections: [
      {
        heading: "Phố cổ và kiến trúc xưa",
        paragraphs: [
          "Các góc phố cổ, tường vàng, cửa gỗ và mái ngói tạo nền rất hợp với áo dài. Khi chụp ở khu đông người, photographer nên dùng lens linh hoạt để bắt khoảnh khắc nhanh.",
          "Màu trang phục đỏ, trắng, xanh ngọc hoặc kem thường nổi bật trên nền kiến trúc Hà Nội."
        ]
      },
      {
        heading: "Vườn hoa và chợ Tết",
        paragraphs: [
          "Vườn hoa cho cảm giác tươi sáng, phù hợp ảnh gia đình hoặc ảnh cá nhân nhẹ nhàng. Chợ Tết lại giàu chi tiết hơn, hợp với concept đời thường.",
          "Hãy chọn giờ ít đông để tránh mất thời gian chờ góc sạch. Nếu chụp gia đình đông người, nên có shot list trước."
        ],
        bullets: [
          "Ảnh toàn thân với áo dài.",
          "Ảnh tương tác gia đình bên hoa hoặc gian hàng.",
          "Ảnh cận phụ kiện Tết để làm album phong phú."
        ]
      },
      {
        heading: "Chuẩn bị cho thời tiết miền Bắc",
        paragraphs: [
          "Thời tiết Hà Nội dịp Tết có thể lạnh hoặc âm u. Nên chuẩn bị áo khoác phù hợp concept và chọn photographer biết xử lý ánh sáng trong ngày nhiều mây.",
          "Một chút sương hoặc trời xám nhẹ cũng có thể tạo cảm giác rất Hà Nội nếu biết chọn màu ảnh và bối cảnh."
        ]
      }
    ],
    checklist: [
      "Theo dõi dự báo thời tiết trước ngày chụp.",
      "Chuẩn bị giày thấp nếu phải đi bộ nhiều.",
      "Chọn trang phục giữ ấm nhưng vẫn cùng bảng màu concept."
    ]
  },
  {
    slug: "tat-tan-tat-ve-chup-anh-tet-2026",
    title: "Tất tần tật về chụp ảnh Tết 2026: xu hướng, thể loại, concept và cách tạo dáng",
    excerpt:
      "Một bộ ảnh Tết đẹp cần có concept rõ, bảng màu phù hợp và lịch chụp đủ sớm để cả nhà thoải mái.",
    image: "/blogs/tet-concepts.jpg",
    date: "01/12/2025",
    readTime: "6 phút đọc",
    author: "Hilu Editorial",
    categories: ["Chuyện Nhiếp Ảnh"],
    intro:
      "Chụp ảnh Tết không chỉ để đăng mạng xã hội trong vài ngày đầu năm. Đó còn là cách lưu lại tinh thần sum họp, sự trưởng thành của con cái và những thay đổi nhỏ của gia đình qua từng năm.",
    sections: [
      {
        heading: "Xu hướng concept Tết 2026",
        paragraphs: [
          "Các concept tối giản, màu ấm và có yếu tố đời thường đang được ưa chuộng. Thay vì set quá nhiều phụ kiện, nhiều gia đình chọn bối cảnh sạch để cảm xúc của mọi người nổi bật hơn.",
          "Bên cạnh đó, áo dài truyền thống vẫn là lựa chọn bền vững, đặc biệt khi kết hợp với hoa, phố cổ hoặc studio có ánh sáng tự nhiên."
        ],
        bullets: [
          "Tối giản với nền kem, đỏ trầm hoặc xanh ngọc.",
          "Dạo phố đầu xuân với chuyển động tự nhiên.",
          "Gia đình quây quần trong không gian nhà quen thuộc."
        ]
      },
      {
        heading: "Cách tạo dáng để ảnh không cứng",
        paragraphs: [
          "Ảnh Tết thường có nhiều người, nên photographer cần tạo tương tác thay vì chỉ xếp hàng nhìn máy. Những hành động nhỏ như trao bao lì xì, chỉnh áo cho nhau hoặc cùng bước đi sẽ giúp ảnh có câu chuyện.",
          "Với trẻ nhỏ, hãy để các bé chơi trong set chụp một lúc trước khi chụp chính. Biểu cảm tự nhiên luôn đáng giá hơn việc ép bé đứng yên quá lâu."
        ]
      },
      {
        heading: "Lịch chụp và bàn giao ảnh",
        paragraphs: [
          "Nên đặt lịch trước Tết ít nhất vài tuần để có thời gian chọn photographer, chuẩn bị đồ và nhận ảnh kịp dùng. Nếu cần ảnh để in thiệp hoặc album, deadline càng cần rõ.",
          "Một buổi chụp tốt nên cân bằng giữa ảnh nhóm đầy đủ, ảnh từng cặp thành viên và ảnh chi tiết. Khi nhận ảnh, bạn sẽ có nhiều chất liệu để dùng hơn."
        ]
      }
    ],
    checklist: [
      "Chọn concept trước rồi mới chọn trang phục.",
      "Lên shot list cho gia đình đông người.",
      "Chốt deadline nhận ảnh trước khi đặt lịch."
    ]
  }
];

export const featuredPost = blogPosts[0];
export const latestPosts = blogPosts.slice(1);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3) {
  const currentPost = getBlogPost(currentSlug);

  if (!currentPost) {
    return [];
  }

  const currentCategories = new Set(currentPost.categories);
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((left, right) => {
      const leftScore = left.categories.filter((category) => currentCategories.has(category)).length;
      const rightScore = right.categories.filter((category) => currentCategories.has(category)).length;
      return rightScore - leftScore;
    })
    .slice(0, limit);
}
