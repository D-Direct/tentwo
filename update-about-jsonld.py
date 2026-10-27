#!/usr/bin/env python3
import json
import re

# Read about.html
with open('about.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON-LD
pattern = r'(<script type="application/ld\+json">)(.*?)(</script>)'
match = re.search(pattern, content, re.DOTALL)

if match:
    jsonld_str = match.group(2).strip()
    jsonld = json.loads(jsonld_str)

    # Update LodgingBusiness
    for item in jsonld['@graph']:
        if item['@type'] == 'LodgingBusiness':
            item['name'] = 'TENTWO Private Residence'
            item['sameAs'] = [
                'https://www.instagram.com/tentwo.residence/',
                'https://www.youtube.com/channel/UCQ48IKbJ31rcb92CKcjK4Mw',
                'https://airbnb.com/h/tentwo',
                'https://www.booking.com/hotel/lk/luxury-villa-in-kandy-with-a-private-pool.html',
                'https://www.agoda.com/luxury-villa-in-kandy-with-a-private-pool/hotel/kandy-lk.html',
                'https://maps.google.com/?cid=8417117858617146359'
            ]

    # Pretty print JSON
    new_jsonld_str = json.dumps(jsonld, indent=6, ensure_ascii=False)

    # Replace in content
    new_content = content.replace(match.group(0), f'{match.group(1)}\n      {new_jsonld_str}\n    {match.group(3)}')

    # Write back
    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print('Updated JSON-LD in about.html')
else:
    print('Could not find JSON-LD in about.html')
