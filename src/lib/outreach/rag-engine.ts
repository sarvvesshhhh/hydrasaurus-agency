import { prisma } from '@/lib/db';

/**
 * Searches the Hydrasaurus Knowledge Base in PostgreSQL for items matching brand category or topic keywords.
 * Returns formatted text context to inject into OpenAI prompt generators.
 */
export async function queryKnowledgeBase(queryContext: string): Promise<string> {
  const allItems = await prisma.knowledgeItem.findMany({
    where: { isActive: true, isArchived: false }
  });

  const query = queryContext.toLowerCase();

  const relevant = allItems.filter((item: any) => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.tags.some((tag: any) => query.includes(tag.toLowerCase()))
    );
  });

  const selectedItems = relevant.length > 0 ? relevant : allItems;

  return selectedItems
    .map((item: any) => `--- KNOWLEDGE ENTRY: ${item.title} (${item.category}) ---\n${item.content}`)
    .join('\n\n');
}
