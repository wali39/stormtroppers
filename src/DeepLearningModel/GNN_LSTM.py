import torch
import torch.nn as nn
import torch.nn.functional as F

class GCNLayer(nn.Module):
    def __init__(self, in_features, out_features):
        super(GCNLayer, self).__init__()
        self.linear = nn.Linear(in_features, out_features)

    def forward(self, x, adj):
        h = torch.matmul(adj, x)
        h = self.linear(h)
        return F.relu(h)

class GNNLSTM(nn.Module):
    def __init__(self, dim, hidden_dim, lstm_hidden_dim, gcn_output_dim):
        super(GNNLSTM, self).__init__()

        self.gcn = GCNLayer(dim, gcn_output_dim)
        self.lstm = nn.LSTM(gcn_output_dim, lstm_hidden_dim, batch_first=True)
        self.fc = nn.Linear(lstm_hidden_dim, dim)

    def forward(self, x, adj):
        seq_len = x.size(1)
        outputs = []
        
        for t in range(seq_len):
            x_t = x[:, t, :]
            x_t = self.gcn(x_t, adj)
            x_t, _ = self.lstm(x_t.unsqueeze(1))
            x_t = self.fc(x_t.squeeze(1))
            outputs.append(x_t)
        
        return torch.stack(outputs, dim=1)

def forecast(model, input_seq, adj, k_steps):
    with torch.no_grad():
        outputs = []

        for _ in range(k_steps):
            out = model(input_seq, adj)
            input_seq = torch.cat((input_seq[:, 1:, :], out[:, -1, :].unsqueeze(1)), dim=1)
            outputs.append(out[:, -1, :])

        return torch.stack(outputs, dim=1)
