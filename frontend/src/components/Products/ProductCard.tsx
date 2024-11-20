import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Product } from '../../services/api';
import { useStore } from '../../store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrls[0] || '/placeholder.jpg'}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '40%' }}>
                SKU
              </TableCell>
              <TableCell>{product.sku}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                Catalogue No.
              </TableCell>
              <TableCell>{product.catalogueNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                Brand
              </TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                Weight/Volume
              </TableCell>
              <TableCell>{product.weightVolume}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Stock: {product.stockQuantity}
            </Typography>
            <IconButton
              color="primary"
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
            >
              <AddShoppingCart />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
