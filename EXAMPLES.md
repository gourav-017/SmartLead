# Usage Examples

## Example API Calls

### 1. Process a Batch of Names

**Endpoint:** `POST /api/leads/process`

**Request:**
```bash
curl -X POST http://localhost:5000/api/leads/process \
  -H "Content-Type: application/json" \
  -d '{
    "names": ["Peter", "Aditi", "Ravi", "Satoshi", "Maria", "Hans"]
  }'
```

**Response:**
```json
{
  "message": "Successfully processed 6 lead(s)",
  "leads": [
    {
      "_id": "...",
      "name": "Peter",
      "predictedCountry": "US",
      "confidenceScore": 0.65,
      "status": "Verified",
      "syncedToCRM": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    ...
  ]
}
```

### 2. Get All Leads

**Endpoint:** `GET /api/leads`

**Request:**
```bash
curl http://localhost:5000/api/leads
```

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Peter",
    "predictedCountry": "US",
    "confidenceScore": 0.65,
    "status": "Verified",
    "syncedToCRM": false
  },
  ...
]
```

### 3. Filter Leads by Status

**Endpoint:** `GET /api/leads?status=Verified`

**Request:**
```bash
curl http://localhost:5000/api/leads?status=Verified
```

### 4. Get Statistics

**Endpoint:** `GET /api/leads/stats`

**Request:**
```bash
curl http://localhost:5000/api/leads/stats
```

**Response:**
```json
{
  "total": 10,
  "verified": 6,
  "toCheck": 4,
  "synced": 3
}
```

## Example Names to Test

### High Confidence Names (Usually Verified)
- Peter, John, Michael, David, James
- Maria, Anna, Sofia, Emma, Olivia
- Hans, Klaus, Wolfgang, Franz, Dieter

### Medium/Low Confidence Names (Usually To Check)
- Aditi, Ravi, Satoshi, Yuki, Chen
- Unique or uncommon names

### Test Batch
```
Peter, Aditi, Ravi, Satoshi, Maria, Hans, Yuki, John, Chen, Emma
```

## Expected Behavior

1. **Processing**: All names are processed concurrently (fast)
2. **Status Assignment**:
   - Confidence ≥ 60% → "Verified"
   - Confidence < 60% → "To Check"
3. **Background Sync**: Every 5 minutes, verified leads are synced
4. **Idempotency**: Once synced, leads won't be synced again

## Testing the Background Job

1. Process some names that result in "Verified" status
2. Wait 5 minutes (or modify cron schedule to `*/1 * * * *` for 1-minute testing)
3. Check backend console for sync logs:
   ```
   Running scheduled CRM sync job...
   [CRM Sync] Found 3 verified lead(s) to sync.
   [CRM Sync] Sending verified lead Peter to Sales Team...
   [CRM Sync] Sending verified lead Maria to Sales Team...
   [CRM Sync] Sending verified lead John to Sales Team...
   [CRM Sync] Successfully synced 3 lead(s).
   ```
4. Run again - same leads won't be synced (idempotency)

## Frontend Usage

1. Open `http://localhost:3000`
2. Enter names: `Peter, Aditi, Ravi, Satoshi`
3. Click "Process Leads"
4. View results in table
5. Use filter buttons to filter by status
6. Watch stats update in real-time
7. Check backend console for sync activity every 5 minutes

