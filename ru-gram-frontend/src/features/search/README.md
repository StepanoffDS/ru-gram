# Search Feature

Компоненты для поиска постов и пользователей с поддержкой бесконечной подгрузки и debounce.

## Компоненты

### SearchTabs

Основной компонент с табами для переключения между поиском постов и пользователей.

```tsx
import { SearchTabs } from '@/features/search/ui';

export default function SearchPage() {
  return <SearchTabs />;
}
```

### SearchInput

Поле ввода с иконкой поиска.

```tsx
import { SearchInput } from '@/features/search/ui';

<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder='Поиск...'
/>;
```

### SearchResults

Компонент для отображения результатов поиска с поддержкой бесконечной подгрузки.

```tsx
import { SearchResults } from '@/features/search/ui';

<SearchResults
  type='posts' // или "users"
  searchTerm={searchTerm}
  active={isActive}
/>;
```

### UserCard

Карточка пользователя для отображения в результатах поиска.

```tsx
import { UserCard } from '@/features/search/ui';

<UserCard user={user} />;
```

## Особенности

- **Debounce**: Поисковые запросы выполняются с задержкой 500мс для оптимизации
- **Бесконечная подгрузка**: Автоматическая подгрузка дополнительных результатов при прокрутке
- **Типизация**: Полная поддержка TypeScript
- **Адаптивность**: Responsive дизайн для всех устройств
- **Состояния загрузки**: Индикаторы загрузки и пустые состояния

## GraphQL запросы

- `FindAllPosts` - поиск постов
- `FindAllUsers` - поиск пользователей

## Зависимости

- `@/shared/hooks/use-debounce` - хук для debounce
- `@/shared/components/ui/*` - UI компоненты
- `@/entities/posts-list` - компонент списка постов
