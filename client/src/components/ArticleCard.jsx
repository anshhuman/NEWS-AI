import React from 'react'
import {Card, Image,Badge,Text,Group,ActionIcon,Flex} from "@mantine/core";
import { Eye, Bookmark, Sparkles } from "lucide-react";



const ArticleCard = ({article , category}) => {
    return (
<Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="flex flex-row gap-6"
    >
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          radius="md"
          className="object-cover"
        />
      )}
      <div className="flex-1">
        <Badge color="yellow" variant="light">
          {category}
        </Badge>
        <Text
          size="xl"
          weight={700}
          className="cursor-pointer hover:underline mt-2"
          onClick={() => window.open(article.url, "_blank")}
        >
          {article.title}
        </Text>
        <Text size="sm" color="gray" mt="sm">
          {article.description}
        </Text>

        <Group mt="md" spacing="xs">
          <Flex align="center" gap="xs">
            <Eye size={16} />
            <Text size="sm">
              {article.views || Math.floor(Math.random() * 500)}
            </Text>
          </Flex>
          <ActionIcon variant="outline" size="sm" color="blue">
            <Bookmark size={18} />
          </ActionIcon>
          <ActionIcon variant="outline" size="sm" color="yellow">
            <Sparkles size={18} />
          </ActionIcon>
        </Group>
      </div>
    </Card>
    )
}

export default ArticleCard
