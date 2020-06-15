import numpy as np
import torch

from cnn_channel import CNNChannel


def normalize_image(img):
  """
  The pixel intensities are stored as an integer between 0 and 255. Divide the intensities by 255 so that
  we have floating-point values between 0 and 1. Then, subtract 0.5 so the values are between -0.5 and 0.5.
  :param img: The Image to be normalized
  :return: The normalized Image
  """
  return (((img[:, :, :3])/255)-0.5)

def pair_up_shoes(shoe1, shoe2):
  new_data = np.zeros((448, 224, 3))
  new_data[:,:,:] = (np.concatenate(np.array((shoe1, shoe2)), axis=0))
  return new_data

def process_images(shoe1, shoe2):
  shoe1_normalized = normalize_image(shoe1)
  shoe2_normalized = normalize_image(shoe2)
  return pair_up_shoes(shoe1_normalized, shoe2_normalized)

def make_pred(model, image):
  image1=image.reshape((1, 448, 224, 3))
  xs = torch.Tensor(image1)
  xs = xs.transpose(1,2).transpose(1,3)
  zs = model(xs)
  pred = zs.max(1, keepdim=True)[1] # get the index of the max logit
  pred = pred.detach().numpy()
  return str(pred)

def classify_shoes(shoe1, shoe2):
  n = 10
  checkpoint = torch.load('model.pk')
  best_model = CNNChannel(n, True)
  best_model.load_state_dict(checkpoint)
  image = process_images(shoe1, shoe2)
  prediction = make_pred(best_model, image)
  # print(prediction)
  return prediction
