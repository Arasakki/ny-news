import React from "react";
import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { ListItem } from "../../typings/models/news";
import { formatDate } from "../../utils/dateUtils";

type NewsArticleProps = {
  item: ListItem;
  isLast: boolean;
  lastNewsElementRef: (node: HTMLDivElement | null) => void;
  style: React.CSSProperties;
}

function NewsArticle({
  item,
  isLast,
  lastNewsElementRef,
  style,
}: NewsArticleProps) {
  if (item.type === "date") {
    return (
      <Box style={style}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {item.date}
        </Typography>
      </Box>
    );
  } else {
    const article = item.article;
    return (
      <Box
        style={{ ...style }}
        sx={{ overflow: "hidden" }}
        ref={isLast ? lastNewsElementRef : undefined}
      >
        <Stack direction="row" spacing={2}>
          <img
            src={
              article.multimedia[0]
                ? `https://www.nytimes.com/${article.multimedia[0].url}`
                : "https://placehold.co/99x74"
            }
            alt="preview"
            width={99}
            height={74}
            style={{ objectFit: "cover" }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ color: "#096FFA" }}>
              {article.source}
            </Typography>
            <Link
              href={article.web_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxHeight: " 100px",
                }}
              >
                {article.abstract}
              </Typography>
            </Link>
            <Typography variant="caption" sx={{ color: "#6D787A" }}>
              {formatDate(article.pub_date)}
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ mt: 1 }} />
      </Box>
    );
  }
}

export default NewsArticle;
