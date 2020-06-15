import torch
import torch.nn as nn
import numpy as np
class CNNChannel(nn.Module):
    def __init__(self, n=4, dropout=False):
        super(CNNChannel, self).__init__()
        self.n=n
        self.dropout=dropout
        self.conv1 = nn.Conv2d(in_channels=6,
                               out_channels=n,
                               kernel_size=5,
                               padding=2)
        self.bn1 = nn.BatchNorm2d(n)
        self.conv2 = nn.Conv2d(in_channels=n,
                               out_channels=(n*2),
                               kernel_size=5,
                               padding=2)
        self.bn2 = nn.BatchNorm2d(n*2)
        self.conv3 = nn.Conv2d(in_channels=(n*2),
                               out_channels=(n*4),
                               kernel_size=5,
                               padding=2)
        self.bn3 = nn.BatchNorm2d(n*4)
        self.conv4 = nn.Conv2d(in_channels=(n*4),
                               out_channels=(n*8),
                               kernel_size=5,
                               padding=2)
        self.bn4 = nn.BatchNorm2d(n*8)
        self.pool = nn.MaxPool2d(2, 2)
        self.drop1 = nn.Dropout2d(p=0.2)
        self.drop2 = nn.Dropout2d(p=0.3)
        self.fc1 = nn.Linear(self.n*8 * 14 * 14, 100)
        self.fc2 = nn.Linear(100, 2)

    def forward(self, x):
        new_x0 = np.array((x.shape[0], 3, 224, 224))
        new_x1 = np.array((x.shape[0], 3, 224, 224))
        new_x0=x[:,:,:224]
        new_x1=x[:,:,224:]
        x = torch.cat((new_x1,new_x0),1)
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.bn1(x)
        if self.dropout:
          x = self.drop1(x)
        x = self.pool(torch.relu(self.conv2(x)))
        x = self.bn2(x)
        if self.dropout:
          x = self.drop1(x)
        x = self.pool(torch.relu(self.conv3(x)))
        x = self.bn3(x)
        if self.dropout:
          x = self.drop2(x)
        x = self.pool(torch.relu(self.conv4(x)))
        x = self.bn4(x)
        if self.dropout:
          x = self.drop2(x)
        x = x.view(-1, self.n*8 * 14 * 14)
        x = torch.relu(self.fc1(x))
        return self.fc2(x)