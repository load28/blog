const fs = require('fs');
const path = require('path');

const UNSPLASH_ACCESS_KEY = 'bwI1j4_P_WnLCFpzhncSlTui-DFEzwJ0phs_LV_yOVc';

// 모든 태그를 프로그래밍 관련 검색어로 매핑
const tags = [
  // 프레임워크/라이브러리 - 구체적인 프로그래밍 키워드
  { name: 'next-js', query: 'nextjs code programming' },
  { name: 'react', query: 'react programming javascript' },
  { name: 'react-native', query: 'mobile app development code' },
  { name: 'typescript', query: 'typescript code programming' },
  { name: 'rust', query: 'rust programming code' },
  { name: 'graphql', query: 'graphql api programming' },
  { name: 'remix', query: 'web development programming' },
  { name: 'qwik', query: 'javascript framework code' },
  { name: 'tanstack', query: 'javascript library programming' },
  { name: 'vanilla-extract', query: 'css in js programming' },
  { name: 'effect', query: 'functional programming code' },
  { name: 'protobuf', query: 'protocol buffer programming' },

  // 개발 도구
  { name: 'pnpm', query: 'package manager programming' },
  { name: 'yarn', query: 'nodejs package programming' },
  { name: 'git', query: 'git version control programming' },
  { name: 'eslint', query: 'code quality javascript' },
  { name: 'grpc', query: 'grpc api programming' },

  // 웹 기술/컨셉 - 프로그래밍 컨텍스트
  { name: 'ssr', query: 'server side rendering code' },
  { name: 'rendering', query: 'web rendering programming' },
  { name: 'optimization', query: 'code optimization programming' },
  { name: 'css', query: 'css stylesheet programming' },
  { name: 'html', query: 'html web development' },
  { name: 'websocket', query: 'websocket programming code' },
  { name: 'context', query: 'state management programming' },
  { name: 'query', query: 'database query programming' },
  { name: 'fiber', query: 'react fiber programming' },
  { name: 'reconciliation', query: 'algorithm programming code' },
  { name: 'design-pattern', query: 'software design pattern code' },

  // 기타 - 프로그래밍 관련 검색어로 변환
  { name: 'functional-programming', query: 'functional programming code' },
  { name: 'function', query: 'programming function code' },
  { name: 'math', query: 'algorithm mathematics programming' },
  { name: 'unicode', query: 'text encoding programming' },
  { name: 'mac', query: 'programming laptop code' }, // mac → 프로그래밍 환경
  { name: 'side-project', query: 'coding project programming' },
  { name: 'reflection', query: 'code review programming' }, // reflection → 코드 리뷰

  // 기본 이미지
  { name: 'default', query: 'programming code developer' },
];

async function downloadImage(tag, query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = `${data.urls.raw}&w=1200&h=500&fit=crop&q=80`;

    // Download the image
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error(`Image download failed: ${imageResponse.status}`);
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(__dirname, 'public', 'images', 'posts', `${tag}.jpg`);
    fs.writeFileSync(filePath, buffer);

    console.log(`✓ Downloaded: ${tag}.jpg (query: "${query}")`);
    return true;
  } catch (error) {
    console.error(`✗ Failed ${tag}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Starting download of 36 programming-related images from Unsplash...\n');

  let successCount = 0;
  let failCount = 0;

  for (const { name, query } of tags) {
    const success = await downloadImage(name, query);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Add delay to avoid rate limiting (50 requests/hour = ~1.2 per minute)
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds between requests
  }

  console.log(`\n✓ Download complete!`);
  console.log(`  Success: ${successCount}/${tags.length}`);
  console.log(`  Failed: ${failCount}/${tags.length}`);
}

main().catch(console.error);
