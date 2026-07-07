import { ResumeData } from '../types/resume';

export const defaultResumeData: ResumeData = {
  metadata: {
    language: 'pl',
    template_id: 'basic_resume_v1',
  },
  basics: {
    name: 'Jan Kowalski',
    title: 'Senior Software Engineer & Architect',
    email: 'jan.kowalski@example.com',
    phone: '+48 500 600 700',
    location: 'Warszawa, Polska (Hybrydowo)',
    urls: {
      linkedin: 'linkedin.com/in/jankowalski-dev',
      github: 'github.com/jankowalski',
      portfolio: 'jankowalski.dev',
    },
    summary:
      'Doświadczony Inżynier Oprogramowania z ponad 6-letnim stażem w projektowaniu, skalowaniu i optymalizacji systemów backendowych oraz chmurowych. Specjalizuję się w architekturze rozproszonej, językach Python i Rust oraz infrastrukturze Kubernetes i AWS. W ostatnich projektach zredukowałem koszty infrastruktury chmurowej o 35% i skróciłem czas odpowiedzi kluczowych mikrousług o 50% dzięki optymalizacji zapytań SQL oraz wdrożeniu asynchronicznego przetwarzania zdarzeń.',
  },
  experience: [
    {
      company: 'CloudScale Solutions',
      position: 'Senior Backend Engineer',
      location: 'Warszawa / Zdalnie',
      startDate: '2022-03',
      endDate: 'obecnie',
      highlights: [
        'Zaprojektowałem i wdrożyłem od zera system przetwarzania strumieniowego w oparciu o Apache Kafka i FastAPI (Python), obsługujący ponad 10 000 zdarzeń na sekundę.',
        'Zoptymalizowałem kluczowe zapytania do bazy danych PostgreSQL, co doprowadziło do spadku obciążenia procesorów o 40% i skrócenia czasu odpowiedzi API z 450 ms do 120 ms.',
        'Przeprowadziłem migrację monolitycznej aplikacji do architektury mikroserwisów na platformie Kubernetes (EKS), redukując koszty operacyjne AWS o 35%.',
        'Prowadziłem mentoring techniczny dla 4 młodszych programistów (Code Reviews, Pair Programming, warsztaty z czystego kodu i wzorców projektowych).',
      ],
    },
    {
      company: 'FinTech Innovations Sp. z o.o.',
      position: 'Software Engineer',
      location: 'Kraków',
      startDate: '2019-07',
      endDate: '2022-02',
      highlights: [
        'Rozwijałem silnik transakcyjny w językach Python i Rust, przetwarzający płatności w czasie rzeczywistym przy zachowaniu rygorystycznych norm bezpieczeństwa PCI-DSS.',
        'Zautomatyzowałem procesy CI/CD z wykorzystaniem GitHub Actions oraz Docker, skracając średni czas wdrożenia nowej wersji z 2 godzin do 15 minut.',
        'Zintegrowałem system ze skomplikowanymi zewnętrznymi API bankowymi (Open Banking / PSD2), implementując odporne na błędy mechanizmy ponawiania z wykładniczym opóźnieniem (exponential backoff).',
      ],
    },
    {
      company: 'StartUp Labs',
      position: 'Junior Python Developer',
      location: 'Warszawa',
      startDate: '2018-06',
      endDate: '2019-06',
      highlights: [
        'Tworzyłem interfejsy REST API w frameworku Django REST Framework dla aplikacji SaaS z branży e-commerce.',
        'Napisałem zestaw kompleksowych testów jednostkowych i integracyjnych (pytest), podnosząc pokrycie kodu testami z 40% do 88%.',
      ],
    },
  ],
  education: [
    {
      institution: 'Politechnika Warszawska',
      degree: 'Magister Inżynier',
      field: 'Informatyka (Specjalizacja: Inżynieria Oprogramowania)',
      startDate: '2018-10',
      endDate: '2020-06',
      gpa: '4.8 / 5.0',
      highlights: [],
    },
    {
      institution: 'Politechnika Warszawska',
      degree: 'Inżynier',
      field: 'Informatyka',
      startDate: '2015-10',
      endDate: '2018-06',
      highlights: [],
    },
  ],
  skills: [
    {
      category: 'Języki Programowania',
      keywords: ['Python (3.11+)', 'Rust', 'TypeScript', 'SQL', 'Bash'],
    },
    {
      category: 'Frameworki i Biblioteki',
      keywords: [
        'FastAPI',
        'Django REST Framework',
        'Next.js',
        'React',
        'Pydantic',
        'SQLAlchemy',
        'Asyncio',
        'Tailwind CSS',
      ],
    },
    {
      category: 'Chmura i DevOps',
      keywords: [
        'AWS (EC2, S3, RDS, EKS, Lambda)',
        'Kubernetes',
        'Docker',
        'Terraform',
        'GitHub Actions',
        'CI/CD',
      ],
    },
    {
      category: 'Bazy Danych i Narzędzia',
      keywords: [
        'PostgreSQL',
        'Redis',
        'Apache Kafka',
        'Git',
        'Typst',
        'Linux',
        'Datadog',
        'Grafana',
      ],
    },
  ],
  projects: [
    {
      name: 'Resume Maxxer (Open Source)',
      description:
        'Generator zoptymalizowanych pod systemy ATS dokumentów CV w formacie PDF, oparty o deterministyczne szablony Typst i uniwersalny standard JSON.',
      url: 'github.com/jankowalski/resume-maxxer',
      keywords: ['Python', 'FastAPI', 'Typst', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      highlights: [
        'Zaprojektowałem architekturę rozdzielającą w 100% warstwę danych od warstwy prezentacji, wykluczając problem halucynacji graficznych i błędów parsowania przez ATS.',
        'Wdrożyłem natywną kompilację Typst w przeglądarce (WebAssembly) oraz integrację z API modeli językowych do automatycznego redagowania treści pod ogłoszenia o pracę.',
      ],
    },
    {
      name: 'Kafka-Fast-Monitor',
      description:
        'Lekkie narzędzie CLI i interfejs webowy do monitorowania opóźnień (consumer lag) w klastrach Apache Kafka.',
      url: 'github.com/jankowalski/kafka-fast-monitor',
      keywords: ['Rust', 'Tokio', 'WebSockets', 'React'],
      highlights: [
        'Zapewnia 10-krotnie mniejsze zużycie pamięci RAM w porównaniu do popularnych rozwiązań opartych o JVM.',
      ],
    },
  ],
  languages: [
    {
      language: 'Język Polski',
      fluency: 'Ojczysty',
    },
    {
      language: 'Język Angielski',
      fluency: 'C1 (Biegły w mowie i piśmie technicznym)',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-08',
    },
    {
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2022-11',
    },
  ],
};
