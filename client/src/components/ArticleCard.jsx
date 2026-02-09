import {
  Card,
  Image,
  Badge,
  Text,
  Group,
  Modal,
  ActionIcon,
  Flex,
} from '@mantine/core';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { Eye, Bookmark, Sparkles } from 'lucide-react';
import { useEffect } from 'react';


const ArticleCard = ({ article, category }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');


  const handleSummarize = async () => {
    open();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3000/ai/generate-content`,
        {
          url: article.url,
        }
      );
      setIsLoading(false);
      setSummary(res.data.summary);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
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
        <h2
          className="cursor-pointer text-xl hover:text-amber-500 hover:underline mt-2"
          onClick={() => window.open(article.url, '_blank')}
        >
          {article.title}
        </h2>
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
          <ActionIcon
            variant="gradient"
            onClick={handleSummarize}
            size="md"
            color="yellow"
            gradient={{ from: 'blue', to: 'cyan', deg: 330 }}
          >
            <Sparkles size={18} />
          </ActionIcon>
        </Group>
      </div>
      <Modal size="md" opened={opened} onClose={close} title="Summary">
        {isLoading ? (
          <div className="h-full flex justify-center gap-6 items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ repeat: Infinity, delay: 1 }}
            >
              <Sparkles size={20} className="animate-pulse text-sky-500" />
            </motion.span>
            <motion.span
              className="text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, delay: 1 }}
            >
              Generating...
            </motion.span>
          </div>
        ) : (
          <div>
            {summary.split(' ').map((word, index) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ delay: index * 0.05 }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ArticleCard;
